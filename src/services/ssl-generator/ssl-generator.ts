import * as fs from 'fs';
import * as punycode from 'punycode';

import * as CSR from '@root/csr';
import * as Keypairs from '@root/keypairs';
import * as PEM from '@root/pem';
import * as ACME from 'acme';

import {createHttp01Challenge} from './http-01-challenge';

export interface IAcmeOptions {
  customerEmail: string;
  subscriberEmail: string;
  maintainerEmail: string;
}

const http01 = createHttp01Challenge('./.well-known/acme-challenge');

export class SslGenerator {
    private static packageAgent = `${process.env.npm_package_name}/${process.env.npm_package_version}`;

    private static acmeDirectoryUrl = process.env.NODE_ENV === 'prod'
        ? 'https://acme-v02.api.letsencrypt.org/directory'
        : 'https://acme-staging-v02.api.letsencrypt.org/directory';

    static async generateCertificate(domain: string, options: IAcmeOptions): Promise<string> {
        const acme = await SslGenerator.initAcme(options);
        const accountKey = await SslGenerator.createOrImportPrivateKey({isAccountKey: true});
        const acmeSubscriberAccount = await SslGenerator.createAcmeSubscriberAccount(acme, options.subscriberEmail, accountKey);
        const serverKey = await SslGenerator.createOrImportPrivateKey({isServerKey: true});
        const domains = [punycode.toASCII(domain)];
        const csr = await SslGenerator.createSignedCertificateRequest(domains, serverKey);
        const opts = {
            account: acmeSubscriberAccount,
            accountKey,
            csr,
            domains,
            challenges: {'http-01': http01},
            skipDryRun: true,
        };
        return SslGenerator.orderCertificate(acme, opts);
    }

    private static async initAcme(options: IAcmeOptions) {
        const notify = (event, error) => {
            console.log(event, error.altname || '', error.status || '');
        };

        const acme = ACME.create({
            maintainerEmail: options.maintainerEmail,
            customerEmail: options.customerEmail,
            packageAgent: SslGenerator.packageAgent,
            notify,
        });

        await acme.init(SslGenerator.acmeDirectoryUrl);
        return acme;
    }

    private static async createOrImportPrivateKey({isAccountKey = false, isServerKey = false}) {
        const keyOptions = {
            account: {
                kty: 'EC',
                path: './account-private-key.pem',
            },
            server: {
                kty: 'RSA',
                path: './server-private-key.pem',
            },
        };
        let target = '';
        if (isAccountKey) {
            target = 'account';
        } else if (isServerKey) {
            target = 'server';
        }

        let privateKey: any;
        if (fs.existsSync(keyOptions[target].path)) {
            const pem = await fs.promises.readFile(keyOptions[target].path, 'ascii');
            privateKey = await Keypairs.import({pem});
        } else {
            const keyPair = await Keypairs.generate({kty: keyOptions[target].kty, format: 'jwk'});
            privateKey = keyPair.private;
            const pem = await Keypairs.export({jwk: privateKey});
            await fs.promises.writeFile(keyOptions[target].path, pem, 'ascii');
            console.info(`wrote ${keyOptions[target].path}`);
        }
        return privateKey;
    }

    private static async createAcmeSubscriberAccount(acme, subscriberEmail: string, accountKey) {
        console.info('registering new ACME account...');
        const account = await acme.accounts.create({
            subscriberEmail,
            agreeToTerms: true,
            accountKey,
        });
        console.info('created account with id', account.key.kid);
        return account;
    }

    private static async createSignedCertificateRequest(domains: Array<string>, serverKey) {
        const encoding = 'der';
        const type = 'CERTIFICATE REQUEST';

        const csrDer = await CSR.csr({jwk: serverKey, domains, encoding});
        return PEM.packBlock({type, bytes: csrDer});
    }

    private static async orderCertificate(acme, options) {
        console.info(`validating domain authorization for ${options.domains.join(' ')}`);
        const pems = await acme.certificates.create(options);

        const fullchain = `${pems.cert}\n${pems.chain}\n`;
        const fullchainPath = './fullchain.pem';
        await fs.promises.writeFile(fullchainPath, fullchain, 'ascii');
        console.info(`wrote ${fullchainPath}`);
        return fullchainPath;
    }
}

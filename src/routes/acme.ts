import * as fs from 'fs';

import {Router} from 'express';

export const createAcmeRouter = () => {
    const router = Router();
    router.get('/.well-known/acme-challenge/:token', async (req, res) => {
        const {token} = req.params;

        const acmeDirectory = './.well-known/acme-challenge/';
        const files = fs.readdirSync(acmeDirectory);
        const neededFile = files.find(x => x.startsWith(token));
        const keyAuthorization = await fs.promises.readFile(`${acmeDirectory}${neededFile}`, 'utf8');
        res.set('Content-Type', 'plain/text').send(keyAuthorization);
    });

    return router;
};

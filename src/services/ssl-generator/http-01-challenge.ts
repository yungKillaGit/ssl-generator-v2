import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';

import * as mkdirp from '@root/mkdirp';

const promisifiedMkdirp = promisify(mkdirp);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

export const createHttp01Challenge = (webroot: string) => {
    return {
        init: () => {
            return null;
        },
        set: data => {
            const {challenge} = data;

            return promisifiedMkdirp(webroot)
                .then(() => {
                    return writeFile(path.join(webroot, challenge.token), challenge.keyAuthorization);
                })
                .then(() => {
                    return null;
                });
        },
        get: data => {
            // console.log('List Key Auth URL', data);
        },
        remove: data => {
            const {challenge} = data;

            return unlink(path.join(webroot, challenge.token))
                .then(() => {
                    return null;
                });
        },
    };
};

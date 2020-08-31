import * as express from 'express';

import {createAcmeRouter, createDomainsRouter, createHomeRouter} from './routes';

export const createApp = () => {
    const acmeRouter = createAcmeRouter();
    const homeRouter = createHomeRouter();
    const domainsRouter = createDomainsRouter();

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(acmeRouter);
    app.use(homeRouter);
    app.use(domainsRouter);

    return app;
};

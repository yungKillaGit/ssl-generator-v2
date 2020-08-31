import {Router} from 'express';

import {SslGenerator} from '../services/ssl-generator';

export const createDomainsRouter = () => {
    const router = Router();
    router.post('/domains', async (req, res) => {
        const {domain, customerEmail, subscriberEmail, maintainerEmail} = req.body;
        const certificatePath = await SslGenerator.generateCertificate(domain, {
            customerEmail,
            subscriberEmail,
            maintainerEmail,
        });
        res.json({message: `Certificate was successfully generated. Path: ${certificatePath}`});
    });

    return router;
};

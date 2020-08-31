import {Router} from 'express';

export const createHomeRouter = () => {
    const router = Router();
    router.get('/', (req, res) => {
        res.json('Hello World!');
    });

    return router;
};

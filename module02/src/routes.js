import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Diego Batista',
        email: 'diego.silva@aluno.ic.ufmt.br',
        password_hash: 'd1d2d3d4d5d6',
    });

    return res.json(user);
});

export default routes;
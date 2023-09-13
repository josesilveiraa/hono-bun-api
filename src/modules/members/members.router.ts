import { Hono } from 'hono';
import controller from './members.controller';
import { authMiddleware } from '../../shared/middlewares/auth-middleware';

const members = new Hono();

members.post('/', controller.create);

members.get('/', authMiddleware(), controller.findAll);

members.get('/:id', authMiddleware(), controller.findOneById);

members.patch('/:id', authMiddleware(), controller.update);

members.delete('/:id', authMiddleware(), controller.delete);

members.patch('/user/:memberId', authMiddleware(), controller.linkToUser);

export { members };

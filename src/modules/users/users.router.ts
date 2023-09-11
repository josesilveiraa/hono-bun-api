import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import controller from './users.controller';

const users = new Hono();

users.post('/', controller.create);

users.get('/', controller.findAll);

users.get('/:id', controller.findOneById);

users.patch('/:id', jwt({ secret: '123' }), controller.update);

users.delete('/:id', controller.delete);

export { users };

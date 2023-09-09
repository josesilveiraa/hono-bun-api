import { Hono } from 'hono';
import controller from './users.controller';

const users = new Hono();

users.post('/', controller.create);
users.get('/', controller.findAll);

export { users };

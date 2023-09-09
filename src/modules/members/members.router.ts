import { Hono } from 'hono';
import controller from './members.controller';

const members = new Hono();

members.post('/', controller.create);
members.patch('/user/:memberId', controller.linkToUser);

export { members };

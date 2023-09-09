import { Hono } from 'hono'
import { router } from './router';
import('./db');


const api = new Hono();

api.route('/', router);

export default api;

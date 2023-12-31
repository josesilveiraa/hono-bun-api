import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { router } from './router';

import('./db');


const api = new Hono();

api.use(cors());

api.route('/', router);

export default api;

import { Hono } from 'hono';
import { users } from './modules/users/users.router';
import { members } from './modules/members/members.router';

const router = new Hono();

router.route('/users', users);
router.route('/members', members);

export { router };

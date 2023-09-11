import { Hono } from 'hono';
import { users } from './modules/users/users.router';
import { members } from './modules/members/members.router';
import { auth } from './modules/auth/auth.router';

const router = new Hono();

router.route('/users', users);
router.route('/members', members);
router.route('/auth', auth);

export { router };

import { Context } from 'hono';
import authService from './auth.service';

class AuthController {
  async signIn(c: Context) {
    const { email, password } = await c.req.json();

    const data = await authService.signIn(email, password);

    return c.json(data);
  }
}

export default new AuthController();

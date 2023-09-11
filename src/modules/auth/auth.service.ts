import usersService from '../users/users.service';
import { HTTPException } from 'hono/http-exception';
import * as jose from 'jose';

class AuthService {
  async signIn(email: string, password: string) {
    const user = await usersService.findOneByEmail(email);

    if (!user) throw new HTTPException(404, { message: 'User not found.' });

    const isValidPassword = await Bun.password.verify(password, user.password, 'bcrypt');

    if (!isValidPassword) throw new HTTPException(401, { message: 'Unauthorized' });

    const secret = new TextEncoder().encode(Bun.env.JWT_SECRET);

    const accessToken = await new jose.SignJWT({ id: user._id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2d')
      .sign(secret);

    return { accessToken };
  }
}

export default new AuthService();

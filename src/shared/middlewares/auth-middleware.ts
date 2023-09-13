import { jwt } from 'hono/jwt';

export function authMiddleware() {
  return jwt({ secret: <string>Bun.env.JWT_SECRET });
}

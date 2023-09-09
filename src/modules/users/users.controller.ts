import { Context } from 'hono';
import { User } from './users.model';
import usersService from './users.service';

class UsersController {
  async create(c: Context) {
    const { name, email, members } = await c.req.json<User>();

    const data = await usersService.create({ name, email, members });

    return c.json(data);
  }

  async findAll(c: Context) {
    const data = await usersService.findAll();

    return c.json(data);
  }
}

export default new UsersController();

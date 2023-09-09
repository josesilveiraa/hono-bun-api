import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Member } from './members.model';
import membersService from './members.service';
import usersService from '../users/users.service';

class MembersController {
  async create(c: Context) {
    const { name, email, users } = await c.req.json<Member>();

    const data = await membersService.create({ name, email, users });

    return c.json(data);
  }

  async linkToUser(c: Context) {
    const { memberId } = c.req.param();
    const { userId } = await c.req.json();

    const userExists = await usersService.exists(userId);

    if (!userExists) throw new HTTPException(404, { message: 'User not found.' });

    const memberExists = await membersService.exists(memberId);

    if (!memberExists) throw new HTTPException(404, { message: 'Member not found.' });

    const memberLink = await membersService.linkToUser(memberId, userId);
    const userLink = await usersService.linkToMember(userId, memberId);

    return c.json({ memberLink, userLink });
  }
}

export default new MembersController();

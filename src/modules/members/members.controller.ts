import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Member } from './members.model';
import membersService from './members.service';
import usersService from '../users/users.service';

class MembersController {
  async create(c: Context) {
    const { name, email, users, active } = await c.req.json<Member>();

    const data = await membersService.create({ name, email, users, active });

    return c.json(data);
  }

  async findAll(c: Context) {
    const members = await membersService.findAll();

    return c.json(members);
  }

  async findOneById(c: Context) {
    const { id } = c.req.param();

    const member = await membersService.findOneById(id);

    if (!member) throw new HTTPException(404, { message: 'Member not found.' });

    return c.json(member);
  }

  async update(c: Context) {
    const { id } = c.req.param();
    const { name, email, users, active } = await c.req.json<Partial<Member>>();

    const member = await membersService.update(id, { name, email, users, active });

    if (!member) throw new HTTPException(404, { message: 'Member not found.' });

    return c.json(member);
  }

  async delete(c: Context) {
    const { id } = c.req.param();

    const member = await membersService.delete(id);

    if (!member) throw new HTTPException(404, { message: 'Member not found.' });

    return c.json(member);
  }

  async linkToUser(c: Context) {
    const { memberId } = c.req.param();
    const { userId } = await c.req.json();

    const userExists = await usersService.exists(userId);

    if (!userExists) throw new HTTPException(404, { message: 'User not found.' });

    const memberExists = await membersService.exists(memberId);

    if (!memberExists) throw new HTTPException(404, { message: 'Member not found.' });

    await membersService.linkToUser(memberId, userId);

    return c.json({ ok: true });
  }
}

export default new MembersController();

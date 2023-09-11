import { Member } from './members.model';
import { Schema, Types } from 'mongoose';
import { User } from '../users/users.model';

class MembersService {
  create(data: Member) {
    return Member.create(data);
  }

  async linkToUser(memberId: string, userId: string) {
    await User.findByIdAndUpdate(userId, { $push: { members: memberId } });
    await Member.findByIdAndUpdate(memberId, { $push: { users: userId } });
  }

  exists(id: string) {
    return Member.exists({ _id: new Types.ObjectId(id) });
  }
}

export default new MembersService();
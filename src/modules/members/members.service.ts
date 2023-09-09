import { Member } from './members.model';
import { Schema, Types } from 'mongoose';

class MembersService {
  create(data: Member) {
    return Member.create(data);
  }

  async linkToUser(memberId: string, userId: string) {
    return Member.findByIdAndUpdate(memberId, { $push: { users: userId } }, { new: true });
  }

  exists(id: string) {
    return Member.exists({ _id: new Types.ObjectId(id) });
  }
}

export default new MembersService();
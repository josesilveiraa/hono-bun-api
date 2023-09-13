import { Member } from './members.model';
import { Types } from 'mongoose';
import { User } from '../users/users.model';

class MembersService {
  create(data: Member) {
    return Member.create(data);
  }

  findAll() {
    return Member.find().populate('users', { _id: 0, name: 1, email: 1 });
  }

  findOneById(id: string) {
    return Member.findById(id);
  }

  update(id: string, data: Partial<Member>) {
    return Member.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return Member.findByIdAndDelete(id);
  }

  exists(id: string) {
    return Member.exists({ _id: new Types.ObjectId(id) });
  }

  async linkToUser(memberId: string, userId: string) {
    await User.findByIdAndUpdate(userId, { $push: { members: memberId } });
    await Member.findByIdAndUpdate(memberId, { $push: { users: userId } });
  }
}

export default new MembersService();
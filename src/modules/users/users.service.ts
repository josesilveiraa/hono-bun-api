import { User } from './users.model';
import { Types } from 'mongoose';
import { Member } from '../members/members.model';

class UsersService {
  create(data: User) {
    return User.create(data);
  }

  findAll() {
    return User.find().populate('members', { _id: 0, name: 1, email: 1 });
  }

  findOneById(id: string) {
    return User.findById(id);
  }

  findOneByEmail(email: string) {
    return User.findOne({ email });
  }

  update(id: string, data: Partial<User>) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return User.findByIdAndDelete(id);
  }

  exists(id: string) {
    return User.exists({ _id: new Types.ObjectId(id) });
  }

  async linkToMember(userId: string, memberId: string) {
    await Member.findByIdAndUpdate(memberId, { $push: { users: userId } });
    await User.findByIdAndUpdate(userId, { $push: { members: memberId } });
  }
}

export default new UsersService();

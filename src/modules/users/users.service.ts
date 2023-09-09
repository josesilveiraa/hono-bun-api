import { User } from './users.model';
import { Types } from 'mongoose';

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

  exists(id: string) {
    return User.exists({ _id: new Types.ObjectId(id) });
  }

  linkToMember(userId: string, memberId: string) {
    return User.findByIdAndUpdate(userId, { $push: { members: memberId } }, { new: true });
  }
}

export default new UsersService();

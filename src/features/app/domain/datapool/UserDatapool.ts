import DataPool from '@/common/domain/datapool/DataPool';
import { IUser } from '@/common/domain/models/UserModel';

class UserDataPool extends DataPool<IUser | undefined> {
  constructor() {
    super(undefined);
  }
}

export const userDatapool = new UserDataPool();

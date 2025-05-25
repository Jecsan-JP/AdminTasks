import DataPool from '@/common/domain/datapool/DataPool';

class AuthDatapool extends DataPool<boolean> {
  constructor() {
    super(false);
  }
}

export const authDatapool = new AuthDatapool();

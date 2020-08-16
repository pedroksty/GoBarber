import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersREpository';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserTokenRepository from '../IUsersTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUserTokenRepository {
  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id
    });

    this.userToken.push(userToken);

    return userToken;
  }
}

export default FakeUserTokenRepository;

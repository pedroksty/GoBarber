import User from '../infra/typeorm/entities/User';
import IcreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(mail: string): Promise<User | undefined>;
  create(data: IcreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

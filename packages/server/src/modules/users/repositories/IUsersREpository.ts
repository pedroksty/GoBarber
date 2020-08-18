import User from '../infra/typeorm/entities/User'
import IcreateUserDTO from '../dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO'

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(mail: string): Promise<User | undefined>
  create(data: IcreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}

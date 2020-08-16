import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('users_token')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;
}

export default UserToken;

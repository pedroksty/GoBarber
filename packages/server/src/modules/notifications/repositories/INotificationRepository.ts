import ICreateNotificcationDTO from '../dtos/ICreateNotificationDTO'
import Notification from '../infra/typeorm/schemas/Notification'

export default interface INotificationRepository {
  create(date: ICreateNotificcationDTO): Promise<Notification>
}

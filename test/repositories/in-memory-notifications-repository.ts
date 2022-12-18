import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '../../src/application/repositories/notification-repositories';

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}

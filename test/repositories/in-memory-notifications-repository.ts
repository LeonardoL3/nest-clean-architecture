import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repositories';

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notificationById = this.notifications.find(notification => notification.id === notificationId);
    return notificationById || null;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(not => not.id === notification.id);
    if (notificationIndex !== -1) {
      this.notifications[notificationIndex].cancel();
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(not => not.recipientId === recipientId).length;
  }
}

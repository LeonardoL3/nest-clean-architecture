import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    const { id, category, content, createdAt, readAt, recipientId } = notification;
    return { id, content: content.value, category, createdAt, readAt, recipientId };
  }
}

import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    const { id, content, category, recipientId, readAt, createdAt } = notification;
    return { id, content: content.value, category, recipientId, readAt, createdAt };
  }
}

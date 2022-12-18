import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    const { id, content, category, recipientId, readAt, createdAt } = notification;
    return { id, content: content.value, category, recipientId, readAt, createdAt };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        content: new Content(raw.content),
        category: raw.category,
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt || new Date(),
        createdAt: raw.canceledAt || new Date(),
        readAt: raw.readAt,
      },
      raw.id,
    );
  }
}

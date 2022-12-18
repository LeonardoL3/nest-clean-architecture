import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '../../../../application/repositories/notification-repositories';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const { content, category, recipientId, readAt, createdAt, id } = notification;
    await this.prismaService.notification.create({
      data: {
        id,
        content: content.value,
        category,
        recipientId,
        readAt,
        createdAt,
      },
    });
  }
  public notifications: Notification[];
}

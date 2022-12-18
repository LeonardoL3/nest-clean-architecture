import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[];
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    // const notificationById = await this.prismaService.notification.findUnique({
    //   where: {
    //     id: {
    //       equals: notificationId,
    //     },
    //   },
    // });

    // return PrismaNotificationMapper.toPrisma(notificationById);
    throw new Error('Method not implemented.');
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }

  countManyByRecipientId(recipientId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();
    this.notificationsRepository.save(notification);
  }
}

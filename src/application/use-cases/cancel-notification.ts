import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();
    this.notificationsRepository.save(notification);
  }
}

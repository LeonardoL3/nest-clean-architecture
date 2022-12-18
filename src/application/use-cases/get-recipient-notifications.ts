import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { Injectable } from '@nestjs/common';

interface getRecipientNotificationsRequest {
  recipientId: string;
}

interface getRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async execute(request: getRecipientNotificationsRequest): Promise<getRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}

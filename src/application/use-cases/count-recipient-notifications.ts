import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId);

    return {
      count,
    };
  }
}

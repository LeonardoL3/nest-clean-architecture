import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const makeSendNotificationsRepository = (): NotificationsRepository => {
  class SendNotificationsRepositoryStub implements NotificationsRepository {
    async create(notification: Notification): Promise<void> {
      notifications.push(notification);
    }
  }

  return new SendNotificationsRepositoryStub();
};

interface SutProps {
  notificationsRepository: NotificationsRepository;
  sut: SendNotification;
}

const makeSut = (): SutProps => {
  const notificationsRepository = makeSendNotificationsRepository();
  const sut = new SendNotification(notificationsRepository);

  return {
    notificationsRepository,
    sut,
  };
};

describe('Send notification', () => {
  it('should be able do send notification', async () => {
    const { sut } = makeSut();

    await sut.execute({
      content: 'there is something waiting for you!',
      category: 'not cool',
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(1);
  });
});

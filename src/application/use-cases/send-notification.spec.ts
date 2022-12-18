import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { SendNotification } from './send-notification';

interface SutProps {
  notificationsRepository: NotificationsRepository;
  sut: SendNotification;
}

const makeSut = (): SutProps => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const sut = new SendNotification(notificationsRepository);

  return {
    notificationsRepository,
    sut,
  };
};

describe('Send notification', () => {
  it('should be able do send notification', async () => {
    const { sut, notificationsRepository } = makeSut();

    const { notification } = await sut.execute({
      content: 'there is something waiting for you!',
      category: 'not cool',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});

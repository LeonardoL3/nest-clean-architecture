import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { UnreadNotification } from './unread-notification';

interface SutProps {
  notificationsRepository: NotificationsRepository;
  sut: UnreadNotification;
}

const makeSut = (): SutProps => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const sut = new UnreadNotification(notificationsRepository);

  return {
    notificationsRepository,
    sut,
  };
};

describe('Unread notification', () => {
  it('should be able to unread notification', async () => {
    const { sut, notificationsRepository } = makeSut();

    const notification = makeNotification();
    notification.read();
    await notificationsRepository.create(notification);

    await sut.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });
});

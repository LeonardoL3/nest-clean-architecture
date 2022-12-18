import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

interface SutProps {
  notificationsRepository: NotificationsRepository;
  sut: CancelNotification;
}

const makeSut = (): SutProps => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const sut = new CancelNotification(notificationsRepository);

  return {
    notificationsRepository,
    sut,
  };
};

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const { sut, notificationsRepository } = makeSut();

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', async () => {
    const { sut } = makeSut();

    expect(() => {
      return sut.execute({
        notificationId: 'invalid_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});

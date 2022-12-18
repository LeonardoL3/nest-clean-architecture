import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

interface SutProps {
  notificationsRepository: NotificationsRepository;
  sut: ReadNotification;
}

const makeSut = (): SutProps => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const sut = new ReadNotification(notificationsRepository);

  return {
    notificationsRepository,
    sut,
  };
};

describe('Cancel notification', () => {
  it('should be able to read notification', async () => {
    const { sut, notificationsRepository } = makeSut();
    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await sut.execute({ notificationId: notification.id });
    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    const { sut } = makeSut();

    expect(async () => {
      await sut.execute({ notificationId: 'non_existing' });
    }).rejects.toThrow(NotificationNotFound);
  });
});

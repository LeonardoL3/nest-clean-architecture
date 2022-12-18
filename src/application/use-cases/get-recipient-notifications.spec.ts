import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

interface SutProps {
  notificationsRepository: NotificationsRepository;
  sut: GetRecipientNotification;
}

const makeSut = (): SutProps => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const sut = new GetRecipientNotification(notificationsRepository);

  return {
    notificationsRepository,
    sut,
  };
};

describe('GET Recipient Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const { sut, notificationsRepository } = makeSut();
    const first_notification = makeNotification({ recipientId: 'specific_id' });
    const second_notification = makeNotification({ recipientId: 'specific_id' });

    await notificationsRepository.create(first_notification);
    await notificationsRepository.create(second_notification);

    const response = await sut.execute({ recipientId: 'specific_id' });

    expect(response.notifications).toHaveLength(2);
    expect(response.notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'specific_id' }),
        expect.objectContaining({ recipientId: 'specific_id' }),
      ]),
    );
  });
});

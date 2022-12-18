import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationsRepository } from '../repositories/notification-repositories';
import { CountRecipientNotification } from './count-recipient-notifications';

interface SutProps {
  notificationsRepository: NotificationsRepository;
  sut: CountRecipientNotification;
}

const makeSut = (): SutProps => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const sut = new CountRecipientNotification(notificationsRepository);

  return {
    notificationsRepository,
    sut,
  };
};

describe('Count recipient notifications', () => {
  it('should be able to count a recipient notifications', async () => {
    const { sut, notificationsRepository } = makeSut();

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient_id_valid' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient_id_valid' }));
    await notificationsRepository.create(makeNotification({ recipientId: 'recipient_id' }));

    const response = await sut.execute({ recipientId: 'recipient_id_valid' });

    expect(response).toEqual({ count: 2 });
  });
});

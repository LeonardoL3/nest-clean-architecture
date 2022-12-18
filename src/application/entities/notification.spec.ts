import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('valid_content'),
      category: 'valid_category',
      recipientId: 'example-recipient-id',
    });
    expect(notification).toBeTruthy();
  });
});

import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';

export function makeNotification(override: Partial<Notification> = {}) {
  const notification = new Notification({
    content: new Content('valid_content'),
    category: 'valid_category',
    recipientId: 'valid_recipient_id',
  });
  return Object.assign(notification, override);
}

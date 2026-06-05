import { useNotificationContext } from '../contexts/notificationContext';

export function useNotification() {
  const context = useNotificationContext();

  return {
    ...context,
    orderNotifications: context.notifications.filter(n => n.type === 'order'),
    promoNotifications: context.notifications.filter(n => n.type === 'promo'),
    systemNotifications: context.notifications.filter(n => n.type === 'system'),
  };
}

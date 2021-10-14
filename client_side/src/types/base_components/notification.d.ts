type NotificationType = 'FREE'
declare interface Notification {
  id?: number;
  // @ts-ignore
  title: string;
  text: string;
  isRead: boolean;
  type: NotificationType;
}
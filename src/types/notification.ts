export interface INotificationAttributes {
  id?: string | null;
  title: string;
  body: string;
  data?: string;
  type?: string;
  userId: string;
  isView?: boolean | false;
  createdAt?: string;
  url: string;
}

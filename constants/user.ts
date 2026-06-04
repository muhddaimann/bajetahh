export const APP_INITIAL = 'B';
export const APP_NAME = 'BajetAhh';
export const APP_TAGLINE = 'Makan Jimat, Order Cepat';
export const AUTH_BUTTON_TEXT = 'Authenticate';

export type User = {
  username: string;
  name: string;
  staffId: string;
  designation: string;
  avatarText: string;
  role: 'customer' | 'admin';
};

export const DUMMY_CUSTOMER: User = {
  username: 'customer',
  name: 'Amirul Afizi',
  staffId: 'CUST1024',
  designation: 'Loyal Customer',
  avatarText: 'AA',
  role: 'customer',
};

export const DUMMY_ADMIN: User = {
  username: 'admin',
  name: 'Siti Aminah',
  staffId: 'ADM2048',
  designation: 'Restaurant Owner',
  avatarText: 'SA',
  role: 'admin',
};
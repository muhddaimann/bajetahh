export type User = {
  username: string;
  name: string;
  staffId: string;
  designation: string;
  avatarText: string;
  role: 'staff' | 'manager';
};

export const DUMMY_STAFF: User = {
  username: '011007100000',
  name: 'Amirul Afizi',
  staffId: 'CS1024',
  designation: 'Customer Service Executive',
  avatarText: 'AH',
  role: 'staff',
};

export const DUMMY_MANAGER: User = {
  username: '011007123333',
  name: 'Siti Aminah',
  staffId: 'MGR2048',
  designation: 'Operations Manager',
  avatarText: 'SA',
  role: 'manager',
};

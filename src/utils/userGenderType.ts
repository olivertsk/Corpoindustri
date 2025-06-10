import { User } from '../types/user';

export const getUserGender = (gender: User['gender']): string => {
  if (gender === 'M') {
    return 'Masculino';
  }

  if (gender === 'F') {
    return 'Femenino';
  }

  if (gender === 'O') {
    return 'Otro';
  }

  return 'N/A';
};

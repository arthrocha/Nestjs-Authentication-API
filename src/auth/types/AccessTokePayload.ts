import { UUID } from 'crypto';

export type AccessTokenPayload = {
  id: string;
  email: string;
};
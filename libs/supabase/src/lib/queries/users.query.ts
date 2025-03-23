import { ilike } from 'drizzle-orm';

import { users } from '../../../migrations/schema';

import { db } from '../db';
import { User } from '../types/db.types';

export const searchUsers = async (email: string): Promise<User[]> => {
  if (!email) return [];

  return db
    .select()
    .from(users)
    .where(ilike(users.email, `${email}%`));
};

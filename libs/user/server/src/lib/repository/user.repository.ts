import { ilike } from 'drizzle-orm';

import { db } from '@notion-clone/supabase';
import { users } from '@notion-clone/supabase/schema';

import { User } from '../models/user.model';

export class UserRepository {
  static async searchUsers(email: string): Promise<User[]> {
    if (!email) return [];

    return db
      .select()
      .from(users)
      .where(ilike(users.email, `${email}%`));
  }
}

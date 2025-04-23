import { db } from '../db';

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  return !!user;
};

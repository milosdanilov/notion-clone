import { InferSelectModel } from 'drizzle-orm';

import { subscriptions } from '../../../migrations/schema';

import { db } from '../db';
import { QueryResult } from '../types/query.interface';

export type Subscription = InferSelectModel<typeof subscriptions>;
// & {
//   prices: InferSelectModel<typeof prices>;
// };

export const getUserSubscriptionStatus = async (
  userId: string
): Promise<QueryResult<Subscription>> => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (s, { eq }) => eq(s.userId, userId),
    });

    if (data) {
      return {
        data: data as Subscription,
        error: null,
      };
    } else {
      return {
        data: null,
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: `Error ${error}`,
    };
  }
};

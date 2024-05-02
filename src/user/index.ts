'use server';

import { createSession, deleteSession } from '@/lib/session';

export const signIn = async (userId: string) => {
  await createSession(userId);
};

export const signOut = async () => {
  await deleteSession();
};

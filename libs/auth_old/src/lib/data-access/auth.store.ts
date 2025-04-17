import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { AuthUser } from './auth.model';

export type AuthState = {
  user: AuthUser;
};

const initialUserValue: AuthUser = {
  id: '',
};

const initialState = {
  user: initialUserValue,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withMethods((store) => ({
    setUser: (user: AuthUser) => {
      patchState(store, { user });
    },
  })),
);

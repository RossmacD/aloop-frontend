import { ReducerWithoutAction } from 'react';

// Export strings : These are the actions that can be run
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export type User = {
  user_id: number;
  first_name: String;
  last_name: String;
  email: String;
};

export interface AuthState {
  auth: boolean;
  user: User | null;
}

interface ReducerAction {
  type: typeof LOGIN | typeof LOGOUT;
  payload: { user: AuthState['user'] };
}

export interface UserAuthContext {
  selfState: AuthState;
  dispatch: React.Dispatch<ReducerAction>;
}

export const authReducer = (state: AuthState, action: ReducerAction): AuthState => {
  switch (action.type) {
    case LOGIN:
      console.log(action);
      // Seperate the api_token from the user, add to state
      const { user } = action.payload;
      return { ...state, auth: true, user };
    case LOGOUT:
      console.log('Logging out');
      return { ...state, auth: false, user: null };
    default:
      console.error('Auth Reducer: Action does not exist', action.type);
      return state;
  }
};

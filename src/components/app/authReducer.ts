// Export strings : These are the actions that can be run
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export type User = {
  user_id: number;
  first_name: String;
  last_name: String;
  email: String;
  role_id: number
};

export interface AuthState {
  auth: boolean;
  user: User | null;
}

interface LoginAction {
  type: typeof LOGIN;
  payload: AuthState['user'];
  connectWebsocket: (user_id: number) => void;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: { user: AuthState['user'] };
}

type ReducerAction = LogoutAction | LoginAction;

export interface UserAuthContext {
  selfState: AuthState;
  dispatch: React.Dispatch<ReducerAction>;
}

export const authReducer = (state: AuthState, action: ReducerAction): AuthState => {
  switch (action.type) {
    case LOGIN:
      console.log(action);
      // Seperate the api_token from the user, add to state
      const user = action.payload;
      if (user?.user_id) {
        console.log("addingSocket")
        action.connectWebsocket(user?.user_id)
      } else {
        console.log("FUCK", action)
      };
      return { ...state, auth: true, user };
    case LOGOUT:
      console.log('Logging out');
      return { ...state, auth: false, user: null };
    default:
      console.error('Auth Reducer: Action does not exist', action);
      return state;
  }
};

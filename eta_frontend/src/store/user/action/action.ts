import { ActionType } from "../action-Types/index";
import { UserState } from "../reducer/reducer";

interface LoginSuccesAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: UserState;
}

interface LoginFailAction {
  type: ActionType.LOGIN_FAIL;
  payload: UserState;
}

interface RegisterSuccessAction {
  type: ActionType.REGISTER_SUCCESS;
  payload: UserState;
}

interface RegisterFailAction {
  type: ActionType.REGISTER_FAIL;
  payload: UserState;
}

interface LogoutAction {
  type: ActionType.LOGOUT;
  payload: UserState;
}

interface SetUser {
  type: ActionType.SETUSER
  payload: UserState
}

interface UpdateUser {
  type: ActionType.UPDATEUSER
  payload: UserState
}

interface ClearUser {
  type: ActionType.CLEARUSER
  payload: UserState
}


export type Action =
  | LoginSuccesAction
  | LoginFailAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction
  | SetUser
  | UpdateUser
  | ClearUser

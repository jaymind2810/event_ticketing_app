import { ActionType } from "../action-Types";
import { UserState } from "../reducer/reducer";

export const loginSuccess = (user: boolean) => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFail = (user: boolean) => {
  return {
    type: ActionType.LOGIN_FAIL,
    payload: user,
  };
};

export const registerSuccess = (user: boolean) => {
  return {
    type: ActionType.REGISTER_SUCCESS,
    payload: user,
  };
};

export const registerFail = (user: boolean) => {
  return {
    type: ActionType.REGISTER_FAIL,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: ActionType.LOGOUT,
  };
};

export const setCurrentUser = (user: UserState) => {
  return {
    type: ActionType.SETUSER,
    payload: user,
  };
};

export const updateCurrentUser = (user: UserState) => {
  return {
    type: ActionType.UPDATEUSER,
    payload: user,
  };
};

export const clearCurrentUser = () => {
  return {
    type: ActionType.CLEARUSER,
    // payload: user,
  };
};


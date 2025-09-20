import { Action } from "../action/action";
import { ActionType } from "../action-Types/index";
// import { MapType } from "../../../pages/getabox/types/BoxSignupType";

export interface UserState {
  id?: number;
  isLoggedIn?: boolean;
  // name?: string;
  first_name?: string;
  last_name?: string;
  user_photo?: string;
  username?:string;
  is_delete?: string;
  role?: string;
  email?: string;
  date_joined?: string;
  city?: string;
  personal_address?: string;
  mobile?: string;
  user_stripe_id?: string;
}

export const initialUserState: UserState = {
  id:0,
  isLoggedIn: false,
  // name: "",
  first_name: "",
  last_name: "",
  user_photo: "",
  username: "",
  is_delete: "",
  role: "",
  email: "",
  date_joined:"",
  city:"",
  personal_address:"",
  mobile:"",
  user_stripe_id:"",
};

const userReducer = (state = initialUserState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case ActionType.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ActionType.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ActionType.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case ActionType.SETUSER:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.UPDATEUSER:
      return {
        ...state,
        ...action.payload,
      };
    case ActionType.CLEARUSER:
      return {
        ...state,
        ...initialUserState
      };
    default:
      return state;
  }
};

export default userReducer;

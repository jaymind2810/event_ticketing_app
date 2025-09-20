import { combineReducers } from "redux";

import loaderReducer from "./loader/reducer/reducer";
import userReducer from "./user/reducer/reducer";
import toastReducer from "./toast/reducer/toast";

const reducers = combineReducers({
  user: userReducer,
  toast: toastReducer,
  loader: loaderReducer,
  // address: addressReducer,
  // cart: cartReducer,
  // order: orderReducer,
});
export default reducers;
export type State = ReturnType<typeof reducers>;

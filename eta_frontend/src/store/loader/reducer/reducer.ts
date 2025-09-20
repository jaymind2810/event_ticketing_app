import { Action } from "../action/action";
import { LoaderType } from "../action-Types/index";

export interface LoaderState {
  isLoading: boolean;
}

export const initialLoaderState: LoaderState = {
  isLoading: false,
};

const loaderReducer = (state = initialLoaderState, action: Action) => {
  switch (action.type) {
    case LoaderType.ACTION_START:
      return {
        ...state,
        isLoading: action.payload
      };

    case LoaderType.ACTION_END:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default loaderReducer;

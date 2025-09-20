import { LoaderType } from "../action-Types";

export const loaderActionStart = () => {
  return {
    type: LoaderType.ACTION_START,
    payload: true,
  };
};

export const loaderActionEnd = () => {
  return {
    type: LoaderType.ACTION_END,
    payload: false,
  };
};

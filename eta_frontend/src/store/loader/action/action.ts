import { LoaderType } from "../action-Types/index";
import { LoaderState } from "../reducer/reducer";

interface ActionStart {
  type: LoaderType.ACTION_START;
  payload: LoaderState;
}

interface ActionEnd {
  type: LoaderType.ACTION_END;
  payload: LoaderState;
}

export type Action = ActionStart | ActionEnd;

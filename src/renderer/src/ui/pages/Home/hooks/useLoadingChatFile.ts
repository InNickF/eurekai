import { useReducer } from "react";

const reducerActionTypes = {
  INIT_LOADING: "INIT_LOADING",
  SET_MESSAGE: "SET_MESSAGE",
  RESET: "RESET",
} as const;

interface ReducerState {
  isLoading: boolean;
  message: string;
}

type ReducerObject = {
  [key in keyof typeof reducerActionTypes]: ReducerState;
};

const initialState: ReducerState = {
  isLoading: false,
  message: "",
};

interface ResetReducerCreateAction {
  type: typeof reducerActionTypes.RESET;
  payload?: null;
}

interface InitLoadingReducerCreateAction {
  type: typeof reducerActionTypes.INIT_LOADING;
  payload: ReducerState["message"];
}

interface SetMessageReducerCreateAction {
  type: typeof reducerActionTypes.SET_MESSAGE;
  payload: ReducerState["message"];
}

type ReducerObjectFn = (
  state: ReducerState,
  payload:
    | ResetReducerCreateAction["payload"]
    | InitLoadingReducerCreateAction["payload"]
    | SetMessageReducerCreateAction["payload"]
) => ReducerObject;

const reducerObject: ReducerObjectFn = (state, payload) => ({
  [reducerActionTypes.RESET]: {
    ...initialState,
  },
  [reducerActionTypes.INIT_LOADING]: {
    isLoading: true,
    message: payload as string,
  },
  [reducerActionTypes.SET_MESSAGE]: {
    ...state,
    message: payload as string,
  },
});

type Reducer = (
  state: ReducerState,
  action:
    | ResetReducerCreateAction
    | InitLoadingReducerCreateAction
    | SetMessageReducerCreateAction
) => ReducerState;

const reducer: Reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type]
    ? reducerObject(state, action.payload)[action.type]
    : state;
};

export const useLoadingChatFile = () => {
  const [loaderState, dispatch] = useReducer(reducer, initialState);

  const initLoading = (message?: InitLoadingReducerCreateAction["payload"]) => {
    dispatch({
      type: reducerActionTypes.INIT_LOADING,
      payload: message || "",
    });
  };

  const setLoaderMessage = (
    message: SetMessageReducerCreateAction["payload"]
  ) => {
    dispatch({
      type: reducerActionTypes.SET_MESSAGE,
      payload: message,
    });
  };

  const resetLoader = () => {
    dispatch({
      type: reducerActionTypes.RESET,
    });
  };

  return {
    loaderState,
    initLoading,
    setLoaderMessage,
    resetLoader,
  };
};

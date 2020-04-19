import produce from "immer";

type State = { [key: string]: boolean };

type Action = { type: "START_LOADING" | "STOP_LOADING"; name: string };

const INITIAL_STATE = {};

export default function loadingReducer(
  state: State = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case "START_LOADING": {
      return produce(state, (nextState) => {
        nextState[action.name] = true;
      });
    }
    case "STOP_LOADING": {
      return produce(state, (nextState) => {
        nextState[action.name] = false;
      });
    }
  }

  return state;
}

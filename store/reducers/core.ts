type Action =
  | { type: "NAVIGATE_TO"; menuItemKey: string }
  | { type: "SET_ERROR"; message: string };

const INITIAL_STATE = {
  activeMenuItemKey: "products",
  error: null,
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function coreReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "NAVIGATE_TO": {
      return { ...state, activeMenuItemKey: action.menuItemKey };
    }
    case "SET_ERROR": {
      return { ...state, error: action.message };
    }
  }
  return state;
}

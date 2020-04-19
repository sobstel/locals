type Action = { type: "NAVIGATE_TO"; menuItemKey: string };

const INITIAL_STATE = {
  activeMenuItemKey: "products",
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function coreReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "NAVIGATE_TO": {
      return { ...state, activeMenuItemKey: action.menuItemKey };
    }
  }
  return state;
}

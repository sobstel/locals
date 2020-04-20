import produce from "immer";

type State = {
  items: { url: string }[];
};

type Action = {
  type: "ORDER_CREATED";
  order: { url: string };
};

const INITIAL_STATE = { items: [] };

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ordersReducer(
  state: State = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case "ORDER_CREATED": {
      return produce(state, (draft) => {
        draft.items.push({ ...action.order });
      });
    }

    default:
      return state;
  }
}

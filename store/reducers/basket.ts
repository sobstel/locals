import produce from "immer";

type State = {
  items: LineItem[];
};
type Action = {
  type: "MODIFY_BASKET" | "CLEAR_BASKET";
  product: Product;
  op: "add" | "remove";
};

const INITIAL_STATE = { items: [] };

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function basketReducer(
  state: State = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case "CLEAR_BASKET": {
      return produce(state, (draft) => {
        draft.items = [];
      });
    }

    case "MODIFY_BASKET": {
      const { product, op } = action;
      const productIndex = state.items.findIndex(
        (itemAt) => itemAt.name === product.name
      );

      return produce(state, (draft) => {
        switch (op) {
          case "add":
            if (productIndex > -1) {
              draft.items[productIndex].count += 1;
            } else {
              draft.items.push({ ...product, count: 1 });
            }
            break;

          case "remove":
            if (productIndex > -1) {
              const newCount = draft.items[productIndex].count - 1;
              if (newCount == 0) {
                draft.items.splice(productIndex, 1);
              } else {
                draft.items[productIndex].count = newCount;
              }
            }
            break;
        }
      });
    }

    default:
      return state;
  }
}

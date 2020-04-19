type State = {
  products: { name: string; price: number; count: number }[];
};
type Action = { type: "ADD_PRODUCT"; product: { name: string; price: number } };

const INITIAL_STATE = {};

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function basketReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      console.log("ADD_PRODUCT", action);
      return state;
    }
  }
  return state;
}

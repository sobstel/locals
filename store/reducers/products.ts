type State = {
  groupedProducts: GroupedProducts;
};

type Action = { type: "PRODUCTS_FETCHED"; groupedProducts: GroupedProducts };

const INITIAL_STATE = {
  groupedProducts: [],
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function productsReducer(
  state: State = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case "PRODUCTS_FETCHED": {
      return { ...state, groupedProducts: action.groupedProducts };
    }
  }
  return state;
}

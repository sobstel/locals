import { combineReducers } from "redux";

import core from "./core";
import basket from "./basket";
import loading from "./loading";
import products from "./products";

export default combineReducers({ core, products, basket, loading });

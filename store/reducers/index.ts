import { combineReducers } from "redux";

import core from "./core";
import basket from "./basket";
import orders from "./orders";
import loading from "./loading";
import products from "./products";

export default combineReducers({ core, products, basket, orders, loading });

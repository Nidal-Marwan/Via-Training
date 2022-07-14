import { createStore, Store, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../Reducers/reducers";

export const store:Store = createStore(
	reducers,
	applyMiddleware(thunk)
);
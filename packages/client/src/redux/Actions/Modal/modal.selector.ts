import { createSelector } from "reselect";
import {State} from "../../Reducers/reducers";

export const modalSelector = (state:State) => state.modal;
export const modal = createSelector(modalSelector,(modal)=>modal);
import { createSelector } from "reselect";
import {State} from "../../Reducers/reducers";

export const modal = (state:State) => state.modal;
export const modalSelector = createSelector(modal,(modal)=>modal);
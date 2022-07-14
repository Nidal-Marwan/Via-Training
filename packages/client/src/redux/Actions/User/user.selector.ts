import {State} from "../../Reducers/reducers";
import { createSelector } from "reselect";


export const user = (state:State) => state.user;
export const userSelector = createSelector(user,(user)=>user);

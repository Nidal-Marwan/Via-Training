import {State} from "../../Reducers/reducers";
import { createSelector } from "reselect";


export const userSelector = (state:State) => state.user;
export const user = createSelector(userSelector,(user)=>user);

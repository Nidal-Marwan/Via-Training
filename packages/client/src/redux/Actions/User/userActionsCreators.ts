import { Dispatch } from "redux";
import { userState } from "../../Reducers/userReducer";
import { UserActions } from "./userActionsTypes";

interface addAction {
	type: UserActions.ADD_USER_INFO
	payload: userState
}
interface deleteAction {
	type: UserActions.DELETE_USER_INFO
	payload: null
}

export type Action = addAction | deleteAction

export const setUser= (userInfo:userState):Action => ({
	type: UserActions.ADD_USER_INFO,
	payload:userInfo
});

export const deleteUser = ():Action=>({
	type:UserActions.DELETE_USER_INFO,
	payload:null});
			
		



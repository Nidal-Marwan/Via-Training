import { Action } from "../Actions/User/userActionsCreators";
import { UserActions } from "../Actions/User/userActionsTypes";

export interface userState {
	id:number,
	username:string,
	email:string,
	phone:string
}
const initialUserState: userState = {
	id:0,
	username:"",
	email:"",
	phone:""
};

export const userReducer = (state = initialUserState, action: Action): userState => {
	switch (action.type) {
	case UserActions.ADD_USER_INFO:
		return {
			id:action.payload.id,
			username:action.payload.username,
			email:action.payload.email,
			phone:action.payload.phone
		};
	case UserActions.DELETE_USER_INFO:
		return {
			id:0,
			username:"",
			email:"",
			phone:""
		};
	default:
		return state;
	}
};

import { Action } from "../Actions/Modal/modalActionsCreators";
import { ModalActions } from "../Actions/Modal/modalActionsTypes";


export interface modalState {
	showModal:boolean
}
const initialUserState: modalState = {
	showModal:false
};

export const modalReducer = (state = initialUserState, action: Action): modalState => {
	switch (action.type) {
	case ModalActions.OPEN_MODAL:
		return {
			showModal:action.payload
		};
	case ModalActions.CLOSE_MODAL:
		return {
			showModal:action.payload
		};
	default:
		return state;
	}
};

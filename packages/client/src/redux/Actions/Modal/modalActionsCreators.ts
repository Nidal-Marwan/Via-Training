import { Dispatch  } from "redux";
import { modalState } from "../../Reducers/modalReducer";
import { ModalActions } from "./modalActionsTypes";


interface openAction {
	type: ModalActions.OPEN_MODAL
	payload: boolean
}
interface closeAction {
	type: ModalActions.CLOSE_MODAL
	payload: boolean
}

export type Action = openAction | closeAction

export const setOpen= ():Action => ({
	type: ModalActions.OPEN_MODAL,
	payload:true
});
	
export const setClose = ():Action=>({
	type:ModalActions.CLOSE_MODAL,
	payload:false
});




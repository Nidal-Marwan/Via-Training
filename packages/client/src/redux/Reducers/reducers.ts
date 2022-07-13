import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { store } from "../Store/store";
import { modalReducer } from "./modalReducer";
import { userReducer } from "./userReducer";

export const reducers = combineReducers({ user: userReducer,modal:modalReducer });
export type State = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const userSelector = ()=>{
	return useSelector((state:State)=>state.user);
};
export const modalSelector = ()=>{
	return useSelector((state:State)=>state.modal);
};
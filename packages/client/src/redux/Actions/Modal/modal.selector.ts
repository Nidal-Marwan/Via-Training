import { useSelector } from "react-redux";
import {State} from "../../Reducers/reducers";

export const modalSelector = ()=>{
	return useSelector((state:State)=>state.modal);
};
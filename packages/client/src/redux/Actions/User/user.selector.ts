import { useSelector } from "react-redux";
import {State} from "../../Reducers/reducers";

export const userSelector = ()=>{
	return useSelector((state:State)=>state.user);
};
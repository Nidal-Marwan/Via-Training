import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { trainingClient } from "../api/trainingClient";
import * as userActionCreators from "../../redux/Actions/User/userActionsCreators";
import { useAppDispatch } from "../../redux/Reducers/reducers";
interface UserInfo {
	user: {
		status: number,
		userInfo: {
			id: number,
			email: string,
			username: string,
			phone: string;
		};
	};
}
export const useMe = ()=>{
	const [userInfo,setUserInfo] = useState<UserInfo>();
	const [error,setError] = useState("");
	const dispatch = useAppDispatch();
	const {setUser} = bindActionCreators(userActionCreators,dispatch);
	const token = window.localStorage.getItem("access_token");
	useEffect(()=>{
		const getInfo = async()=>{
			
			try{
				const userInfo = await trainingClient.get<UserInfo>("/home/user",{headers: {
					Authorization: `Bearer ${token}`
				}});
				if( userInfo.data.user.status === 200 ){
					setUserInfo(userInfo.data);
					dispatch(setUser(userInfo.data.user.userInfo));
				}
			} catch (e: any) {
				setError(e);
			}
		};
		getInfo();
	},[token]);
	return {userInfo,error};
};

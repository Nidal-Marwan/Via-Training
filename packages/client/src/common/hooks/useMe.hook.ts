import { useEffect, useState } from "react";
import { trainingClient } from "../api/trainingClient";

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
	useEffect(()=>{
		const getInfo = async()=>{
			const token = window.localStorage.getItem("access_token");
			try{
				const userInfo = await trainingClient.get<UserInfo>("/home/user",{headers: {
					Authorization: `Bearer ${token}`
				}});
				if( userInfo.data.user.status === 200 ){
					setUserInfo(userInfo.data);
				}
			} catch (e: any) {
				setError(e);
			}
		};
		getInfo();
<<<<<<< HEAD
	},[]);
	return {userInfo,error};
};
=======
	}, []);
	return { userInfo, error };
};
>>>>>>> main

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
export const useMe = () => {
	const [userInfo, setUserInfo] = useState<UserInfo>();
	const [error, setError] = useState("");
	useEffect(() => {
		const getInfo = async () => {
			try {
				const userInfo = await trainingClient.get<UserInfo>("/home/user");
				if (userInfo.data.user.status === 200) {
					setUserInfo(userInfo.data);
				}
			} catch (e: any) {
				setError(e);
			}
		};
		getInfo();
	}, []);
	return { userInfo, error };
};

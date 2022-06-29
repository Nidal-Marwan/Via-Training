import { useMe } from "../../common/hooks/useMe.hook";

export const FavLocation:React.FC = () => {
	const {userInfo} = useMe();
 
	return <p>Welcome {userInfo?.user.userInfo.email} </p>;
};

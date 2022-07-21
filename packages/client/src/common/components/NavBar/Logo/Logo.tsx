import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo192.png";

interface LogoProps {
	isLoggedIn: boolean;
}

const Logo = ({ isLoggedIn }: LogoProps) => {
	return <Link to={isLoggedIn ? "live-map" : "/"}>
		<img src={logo} />
	</Link>;
};
export default Logo;
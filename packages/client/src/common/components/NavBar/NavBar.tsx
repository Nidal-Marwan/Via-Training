import {
	Box,
	AppBar,
	Typography,
	MenuItem,
} from "@mui/material";
import { StyledToolBar, StyledBox, StyledActionsBox } from "./NavBar.style";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useEffect, useState } from "react";
import { CustomButton } from "../Button/Button";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../../redux/Actions/User/userActionsCreators";
import { useAppDispatch } from "../../../redux/Reducers/reducers";
import Logo from "./Logo/Logo";

const checkIsLoggedIn = () => {
	return Boolean(window.localStorage.getItem("access_token"));
};

export const NavBar: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());
	const dispatch = useAppDispatch();
	const { deleteUser } = bindActionCreators(userActionCreators, dispatch);

	useEffect(() => {
		window.addEventListener("storage", () => {
			setIsLoggedIn(checkIsLoggedIn());
		});
	}, [checkIsLoggedIn()]);

	const handleLogout = () => {
		if (window.localStorage.getItem("access_token")) {
			window.localStorage.removeItem("access_token");
			window.dispatchEvent(new Event("storage"));
			dispatch(deleteUser());
		}
	};

	const { t } = useTranslation();
	return (
		<Box>
			<AppBar color='secondary' position='static'>
				<StyledToolBar>
					<StyledBox>
						<Logo />
						{isLoggedIn && <>
							<MenuItem>
								<Typography variant='h6' component='div'>
									<Link to='liveMap'>{t("nav.map")}</Link>
								</Typography>
							</MenuItem>
							<MenuItem>
								<Typography variant='h6' component='div'>
									<Link to='drivers'> {t("nav.driver")}</Link>
								</Typography>
							</MenuItem>
							<MenuItem>
								<Typography variant='h6' component='div'>
									<Link to='locations'> {t("nav.location")}</Link>
								</Typography>
							</MenuItem>
						</>}
					</StyledBox>
					<StyledActionsBox>
						<LanguageSelector />
						{isLoggedIn && <CustomButton type="button" color="primary" title={t("nav.signout")} onClick={handleLogout} />}
					</StyledActionsBox>
				</StyledToolBar>
			</AppBar>
		</Box>
	);
};


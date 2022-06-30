import {
	Box,
	AppBar,
	Typography,
	MenuItem
} from "@mui/material";
import { StyledToolBar, StyledBox } from "./NavBar.style";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useEffect, useState } from "react";
import { CustomButton } from "../Button/Button";

const handleLogout = () => {
	if(window.localStorage.getItem("access_token")){
		window.localStorage.removeItem("access_token");
	}else{
		return;
	}
};

const shouldHideSignoutButton = () => {
	if(window.localStorage.getItem("access_token")){
		return "visible";
	}else{
		return "hidden";
	}
};

export const NavBar: React.FC = () => {
	const [isHidden, setIsHidden] = useState(shouldHideSignoutButton());
	useEffect(()=>{
		window.addEventListener("storage", () => {
			setIsHidden(shouldHideSignoutButton());
		});
		
		
	},[isHidden]);
	
	const { t } = useTranslation();
	return (
		<Box>
			<AppBar color='secondary' position='static'>
				<StyledToolBar>
					<StyledBox>
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
					</StyledBox>
					<StyledBox>
						<LanguageSelector />
						<CustomButton type="button" color="primary" title={t("nav.signout")} style={{visibility:isHidden}} onClick={handleLogout}/>	
					</StyledBox>
					
				</StyledToolBar>
			</AppBar>
		</Box>
	);
};

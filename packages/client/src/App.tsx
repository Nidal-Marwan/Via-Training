import { Home } from "./views/Home/Home";
import Drivers from "./views/Drivers/Drivers";
import { useTranslation } from "react-i18next";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Container, Box, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";
import  {NavBar}  from "./common/components/NavBar/NavBar";
import { SignUp } from "./common/components/SignUp/SignUp";
import { customTheme } from "./common/utils/theme";
import  {FavLocation}  from "./views/FavoriteLocation/FavLocation";
import { useEffect, useState } from "react";
import { useMe } from "./common/hooks/useMe.hook";
import { bindActionCreators } from "redux";
import { useAppDispatch } from "./redux/Reducers/reducers";
import * as modalActionCreators from "./redux/Actions/Modal/modalActionsCreators";

const cacheLtr = createCache({
	key: "muiltr",
});
const cacheRtl = createCache({
	key: "muirtl",
	// prefixer is the only stylis plugin by default, so when
	// overriding the plugins you need to include it explicitly
	// if you want to retain the auto-prefixing behavior.
	stylisPlugins: [prefixer, stylisRTLPlugin],
});
const checkIsLoggedIn = () => {
	return Boolean(window.localStorage.getItem("access_token"));
};

export const App = () => {
	const { userInfo } = useMe();
	const dispatch = useAppDispatch();
	const {setClose} = bindActionCreators(modalActionCreators,dispatch);
	const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());
	const [shownModal, setShownModal] = useState(false);
	useEffect(() => {
		window.addEventListener("storage", async function (e) {
			setIsLoggedIn(checkIsLoggedIn());
			setShownModal(false);
			dispatch(setClose());
		});		
	}, []);

	const { i18n } = useTranslation();
	document.body.dir = i18n.dir();
	return (
		<>
			<CacheProvider value={i18n.dir() === "rtl" ? cacheRtl : cacheLtr}>
				<ThemeProvider theme={{ ...customTheme, direction: i18n.dir() }}>
					<CssBaseline />
					{userInfo && isLoggedIn && <NavBar />}
					<Container maxWidth="xl">
						<Box>
							<Routes>
								<Route path="/" element={isLoggedIn && shownModal ? <Navigate to="/locations" /> : <Home />} />
								<Route path="signup" element={isLoggedIn ? <Navigate to="/locations" /> : <SignUp />} />
								<Route path="locations" element={isLoggedIn ? <FavLocation /> : <Navigate to="/" />} />
								<Route path="drivers" element={isLoggedIn ? <Drivers /> : <Navigate to="/" />} />
								{/* <Route path="liveMap" element={ <Map/> } />*/}
							</Routes >
						</Box >
					</Container >
				</ThemeProvider >
			</CacheProvider >
		</>
	);

};

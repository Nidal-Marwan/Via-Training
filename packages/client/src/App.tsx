import { Home } from "./views/Home/Home";
import { useTranslation } from "react-i18next";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Container, Box, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "./common/components/NavBar/NavBar";
import { SignUp } from "./common/components/SignUp/SignUp";
import { customTheme } from "./common/utils/theme";
import { ModalContainer } from "./common/components/ModalContainer/ModalContainer";
import { FavLocation } from "./views/FavoriteLocation/FavLocation";
import { useEffect, useState } from "react";


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
	const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());
	useEffect(() => {
		setIsLoggedIn(checkIsLoggedIn());
	}, []);
	const { i18n } = useTranslation();
	document.body.dir = i18n.dir();
	return (
		<>
			<CacheProvider value={i18n.dir() === "rtl" ? cacheRtl : cacheLtr}>
				<ThemeProvider theme={{ ...customTheme, direction: i18n.dir() }}>
					<CssBaseline />
					<NavBar />
					<Container maxWidth="xl">
						<Box>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="signup" element={<SignUp />} />
								<Route path="locations" element={isLoggedIn ? <FavLocation/> : <Navigate to="/" />} />
								{/* <Route path="liveMap" element={ <Map/> } />
                    <Route path="drivers" element={ <Drivers/> } />
                */}
							</Routes>
						</Box>
					</Container>
				</ThemeProvider>
			</CacheProvider>
		</>
	);

};

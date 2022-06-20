import { Home } from "./views/Home/Home";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import languages from "./common/localization/languages";
import cookies from "js-cookie";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
  Box,
  ThemeProvider,
  Button,
} from "@mui/material";

import { Routes, Route } from "react-router-dom";
import { NavBar } from "./common/components/NavBar/NavBar";
import { SignUp } from "./common/components/SignUp/SignUp";
import { customTheme } from "./common/utils/theme";
import Modal from "./common/components/Modal/Modal";

///////////////////////////////////TABLE DUMMY DATA////////////////////////////
const headers = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "lat", headerName: "Latitude", type: "number", width: 100 },
  { field: "long", headerName: "Longitude", type: "number", width: 100 },
  { field: "date", headerName: "Date", type: "date", width: 100 },
];
const data = [
  {
    id: 1,
    name: "London",
    lat: 35.3,
    long: 35.3,
    date: new Date("2022-6-10"),
  },
  {
    id: 4,
    name: "London",
    lat: 35.3,
    long: 35.3,
    date: new Date("2022-6-10"),
  },
  {
    id: 2,
    name: "London",
    lat: 33.3,
    long: 35.3,
    date: new Date("2022-6-9"),
  },
  {
    id: 3,
    name: "London",
    lat: 34.3,
    long: 35.3,
    date: new Date("2022-6-12"),
  },
];
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////LTR/RTL THEME SETTINGS/////////////////////////
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
//////////////////////////////////////////////////////////////////////////////

export const App = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
  };

  const currentLanguageCode = cookies.get("i18next") || "en";

  const [language, setLanguage] = useState(
    currentLanguageCode === "en" ? "English" : "العربية"
  );
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const onAccept = () => {
    handleClose();
    //Routing to favorite locations page
  };

  const onCancel = () => {
    handleClose();
    //Routing to live page
  };

  return (
    <>
      <CacheProvider value={i18n.dir() === "rtl" ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={{ ...customTheme, direction: i18n.dir() }}>
          <NavBar />
          <Container maxWidth="xl">
            <Box>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="signup" element={<SignUp />} />
                {/* <Route path="liveMap" element={ <Map/> } />
      <Route path="drivers" element={ <Drivers/> } />
  <Route path="locations" element={ <Locations/> } /> */}
              </Routes>
            </Box>
            <Box>
              <Select onChange={handleChange} value={language}>
                {languages.map(({ code, name }) => (
                  <MenuItem
                    key={code}
                    value={name}
                    onClick={() => changeLanguage(code)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
              message={t("modal.favorites.message")}
              acceptText={t("modal.favorites.accept")}
              cancelText={t("modal.favorites.decline")}
              open={showModal}
              onAccept={onAccept}
              onCancel={onCancel}
            />
          </Container>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

import { Home } from "./views/Home/Home";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import languages from "./common/localization/languages";

import cookies from "js-cookie";

import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

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

  return (
    <>
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
      <div>{t("app.sekeleton")}</div>
      <Home />
    </>
  );
};

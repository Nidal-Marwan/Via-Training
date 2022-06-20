import { Box, AppBar, Toolbar, Typography, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <AppBar sx={{ backgroundColor: "tomato" }} position="static">
        <Toolbar>
          <MenuItem>
            <Typography variant="h6" component="div">
              <Link to="liveMap">{t("nav.map")}</Link>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="h6" component="div">
              <Link to="drivers"> {t("nav.driver")}</Link>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="h6" component="div">
              <Link to="locations"> {t("nav.location")}</Link>
            </Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

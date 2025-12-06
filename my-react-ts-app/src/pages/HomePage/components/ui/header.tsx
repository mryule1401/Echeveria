import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Hàm scroll đến Contact
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/" },
    { label: "Contact", link: null },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 0,
          width: "100%",
        }}
      >
        {/* ==== MOBILE MENU BUTTON ==== */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={handleOpenMenu} sx={{ color: "#1b4734" }}>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Box>

        {/* ==== LOGO ==== */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.svg"
            alt="logo"
            style={{ width: 50, height: 50 }}
          />

          <Button
            component={RouterLink}
            to={"/"}
            disableRipple
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              textTransform: "none",
              color: "#000",
              "&:hover": { backgroundColor: "transparent !important" },
              "&:active": { backgroundColor: "transparent !important" },
            }}
          >
            Encheveria
          </Button>
        </Box>

        {/* ==== DESKTOP MENU ==== */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 6,
            "& .MuiButton-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1.2rem",
              color: "#000",
            },
          }}
        >
          {menuItems.map((item) =>
            item.label === "Contact" ? (
              <Button
                disableRipple
                key={item.label}
                onClick={handleScrollToContact}
                sx={{ height: "4rem" }}
              >
                Contact
              </Button>
            ) : (
              <Button
                disableRipple
                key={item.label}
                component={RouterLink}
                to={item.link!}
                sx={{
                  height: "4rem",
                  
                }}
              >
                {item.label}
              </Button>
            )
          )}
        </Box>

        {/* ==== RIGHT ICONS ==== */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "none", md: "2rem" },
            "& .MuiButton-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              color: "#000",
            },
          }}
        >
          <IconButton disableRipple sx={{ color: "#000" }}>
            <FontAwesomeIcon icon={faUser} />
          </IconButton>

          <IconButton disableRipple sx={{ color: "#000" }}>
            <FontAwesomeIcon icon={faCartShopping} />
          </IconButton>
        </Box>

        {/* ==== MOBILE MENU DROPDOWN ==== */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              width: 200,
              backgroundColor: "#1b4734",
              borderRadius: "16px",
              boxShadow: "0px 3px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          {menuItems.map((item) =>
            item.label === "Contact" ? (
              <MenuItem
                key="Contact"
                onClick={() => {
                  handleScrollToContact();
                  handleCloseMenu();
                }}
                sx={{
                  color: "#fff",
                  justifyContent: "center",
                  "&:hover": { color: "#a3d9a5", backgroundColor: "transparent" },
                }}
              >
                Contact
              </MenuItem>
            ) : (
              <MenuItem
                key={item.label}
                component={RouterLink}
                to={item.link!}
                onClick={handleCloseMenu}
                sx={{
                  color: "#fff",
                  justifyContent: "center",
                  "&:hover": { color: "#a3d9a5", backgroundColor: "transparent" },
                }}
              >
                {item.label}
              </MenuItem>
            )
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

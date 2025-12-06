// import * as React from "react";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 4rem",
        backgroundColor: "#06281d",
        fontSize: "1.2rem",
        color: "#fff",
        height: "6rem",
      }}
    >
      © {new Date().getFullYear()} Encheveria - Decor your Home
    </Box>
  );
};

export default Footer;

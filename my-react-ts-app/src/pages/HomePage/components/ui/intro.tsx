import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Intro = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: { xs: "0 2rem", md: "0 6rem" },
        width: "100%",
        minHeight: {xs: "400px" , sm: "calc(100vh - 64px)"},
        boxSizing: "border-box",
        
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "url('/intro.jpg') center/cover no-repeat",
          filter: "brightness(0.6)",
          zIndex: -1000,
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
          color: "#fff",
          textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "2.2rem",
              sm: "2.6rem",
              md: "3.2rem",
              lg: "3.6rem",
            },
            mb: "1rem",
          }}
        >
          Enjoy Your Shopping
        </Typography>

        <Typography
          component="p"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.4rem" },
            mb: "2rem",
            maxWidth: "1000px",
          }}
        >
          Providing plant enthusiasts with an easy and enjoyable way to browse
          and purchase Echeveria succulents online while showcasing the beauty
          and variety of these plants.
        </Typography>

        <Button
          component={RouterLink}
          to="/login"
          sx={{
            backgroundColor: "#3fa34d",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            fontSize: { xs: "1rem", md: "1.2rem" },
            textTransform: "none",
            "&:hover": { backgroundColor: "#348c42" },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Intro;

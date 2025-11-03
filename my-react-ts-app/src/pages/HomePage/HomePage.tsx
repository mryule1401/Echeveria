import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from "@mui/material";


const HomePage: React.FC = () => {
  return (
    <Box component="main">
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 1rem",
        //   backgroundImage: `url(${...}})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "#fff",
        }}
      >
        <Typography
          component="h1"
          sx={{ fontSize: "3rem", fontWeight: 700, mb: "1rem", color:"#fff" }}
        >
          Enjoy Your Shopping
        </Typography>

        <Typography
          component="p"
          sx={{ fontSize: "1.5rem", maxWidth: 600, mb: "2rem",color:"#fff" }}
        >
          Providing plant enthusiasts with an easy and enjoyable way to browse and purchase Echeveria succulents online while showcasing the beauty and variety of these plants.
        </Typography>

        <Button
          component={RouterLink}
          to="/login"
          sx={{
            backgroundColor: "#3fa34d",
            color: "#fff",
            padding: "0.75rem 2rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "background 0.3s ease",
            textTransform: "none",
            "&:hover": { backgroundColor: "#348c42" },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* How it Works */}
      <Box sx={{ padding: "4rem 1rem" }}>
        <Container
          disableGutters
          sx={{ maxWidth: "1000px", mx: "auto" }}
        >
          <Typography
            component="h2"
            sx={{ fontSize: "2rem", mb: "2rem", textAlign: "center" }}
          >
            Welcome to Echeveria🪴
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                n: "1",
                title: "Name",
                desc:
                  "",
              },
              {
                n: "2",
                title: "Name",
                desc:
                  "",
              },
              {
                n: "3",
                title: "Name",
                desc:
                  "",
              },
            ].map((s, i) => (
              <Paper
                key={i}
                elevation={0}
                sx={{
                  backgroundColor: "backgroud.paper",
                  padding: "2rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "#3fa34d",
                    mb: "1rem",
                  }}
                >
                  {s.n}
                </Typography>
                <Typography component="h3" color="text.primary" sx={{ fontWeight: 700, mb: 1 }}>
                  {s.title}
                </Typography>
                <Typography component="p" color="text.primary">{s.desc}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Why Team Up */}
      <Box sx={{ padding: "4rem 1rem" }}>
        <Container
          disableGutters
          sx={{ maxWidth: "1000px", mx: "auto" }}
        >
          <Typography
            component="h2"
            sx={{ fontSize: "2rem", mb: "2rem", textAlign: "center" }}
          >
            About us
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Description 1",
                desc:
                  "",
              },
              {
                title: "Description 2",
                desc:
                  "",
              },
            ].map((card, i) => (
              <Paper
                key={i}
                elevation={0}
                sx={{
                  backgroundColor: "backgroud.paper",
                  padding: "2rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Typography component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography component="p">{card.desc}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Bottom */}
      <Box sx={{ padding: "4rem 1rem", textAlign: "center" }}>
        <Container disableGutters sx={{ maxWidth: "1000px", mx: "auto" }}>
          <Typography component="h2" sx={{ fontSize: "2rem", mb: "1rem" }}>
            Enjoy your lovely time with Encheveria🪴
          </Typography>

        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          padding: "2rem 1rem",
          backgroundColor: "background.paper",
          fontSize: "0.9rem",
          color: "text.primary",
        }}
      >
        © {new Date().getFullYear()} Encheveria - Decor your House
      </Box>
    </Box>
  );
};

export default HomePage;
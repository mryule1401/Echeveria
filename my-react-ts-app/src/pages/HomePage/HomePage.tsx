import * as React from 'react';
// import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
} from "@mui/material";

import Header from "./components/ui/header";
import Intro from './components/ui/intro';
import Footer from './components/ui/footer';
import Contact from './components/ui/contact';

const HomePage: React.FC = () => {
  return (
    <Box component="main">
      {/* Hero Section */}

      <Header />

      <Intro />

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

      <Contact />

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
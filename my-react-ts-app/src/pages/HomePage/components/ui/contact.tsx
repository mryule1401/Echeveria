import { Box, Typography, Button } from "@mui/material";
// import React from "react";

const Contact = () => {
  return (
    <Box
      id="contact"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: "2.5rem", // 40px
        p: { xs: "1.5rem", md: "4rem 4rem" }, // 24px → 40px
        boxSizing: "border-box",
      }}
    >
      {/* LEFT BOX */}
      <Box
        sx={{
          flex: 1,
          border: "0.1rem solid #1d6f47", // 1px
          p: { xs: "1.5rem", md: "2.5rem" },
          borderRadius: "0.25rem", // 4px
          boxSizing: "border-box",
        }}
      >
        {/* <Typography
          sx={{
            color: "#1d6f47",
            fontSize: "0.875rem", // 14px
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          CÓ CÂU HỎI?
        </Typography> */}

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.75rem", // 28px
            mt: "0.5rem",
            mb: "2rem",
          }}
        >
          Contact Encheveria at
        </Typography>

        {/* ADDRESS */}
        <Box sx={{ mb: "1.5rem" }}>
          <Box
            sx={{
              background: "#1d6f47",
              color: "white",
              p: "0.625rem 0.875rem", // 10px 14px
              borderRadius: "0.25rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Address
          </Box>

          <Typography sx={{ mt: "0.75rem", lineHeight: 1.6 }}>
            123 Ho Chi Minh city, Vietnam.
          </Typography>
        </Box>

        {/* EMAIL */}
        <Box sx={{ mb: "1.5rem" }}>
          <Box
            sx={{
              background: "#1d6f47",
              color: "white",
              p: "0.625rem 0.875rem",
              borderRadius: "0.25rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Email
          </Box>

          <Typography sx={{ mt: "0.75rem" }}>abc@example.com</Typography>
        </Box>

        {/* PHONE */}
        <Box sx={{ mb: "1rem" }}>
          <Box
            sx={{
              background: "#1d6f47",
              color: "white",
              p: "0.625rem 0.875rem",
              borderRadius: "0.25rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Phone Number
          </Box>

          <Typography sx={{ mt: "0.75rem" }}>0123456789</Typography>
        </Box>
      </Box>

      {/* RIGHT BOX */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          flex: 1,
          border: "0.1rem solid #1d6f47",
          p: { xs: "1.5rem", md: "2.5rem" },
          borderRadius: "0.25rem",
          boxSizing: "border-box",
        }}
      >
        {/* <Typography
          sx={{
            color: "#1d6f47",
            fontSize: "0.875rem",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          CẬP NHẬT BẢN TIN
        </Typography> */}

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.75rem",
            mt: "0.5rem",
            mb: "0.75rem",
          }}
        >
          Subscribe for updates
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#333",
            mb: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          Subscribe to our newsletter and stay updated.
        </Typography>

        {/* INPUT */}
        <Box
          sx={{
            border: "0.1rem solid #1d6f47",
            borderRadius: "0.25rem",
            display: "flex",
            alignItems: "center",
            p: "0.75rem 0.875rem",
            mb: "1.5rem",
            gap: "0.625rem",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address."
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "0.9375rem", // 15px
            }}
          />
        </Box>

        <Button
          fullWidth
          sx={{
            background: "#1d6f47",
            color: "#fff",
            fontWeight: 600,
            p: "0.875rem", // 14px
            fontSize: "1rem", // 16px
            border: "0.1rem solid #1d6f47",
            "&:hover": {
              background: "#155a38",
            },
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;

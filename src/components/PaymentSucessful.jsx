import React from "react";
import { Typography, Button, Grid, Box, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const PaymentSuccessful = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Redirect to the homepage or any other page
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
      <Box
        component={Paper}
        sx={{
          padding: 4,
          textAlign: "center",
          borderRadius: 4,
          boxShadow: 3,
          background: "#fff",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <CheckCircleIcon
          sx={{ fontSize: 80, color: "green", marginBottom: 2 }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "green" }}>
          Payment Successful!
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Your wedding package has been confirmed successfully.
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Thank you for choosing our services. We look forward to making your special day memorable.
        </Typography>

        <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#9c27b0",
                color: "white",
                fontWeight: "bold",
                py: 2,
                px: 6,
                borderRadius: "12px",
                boxShadow: 6,
                ":hover": { bgcolor: "#7b1fa2", boxShadow: 8 },
              }}
              onClick={handleGoHome}
            >
              Go to Homepage
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PaymentSuccessful;

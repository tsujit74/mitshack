import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const { totalCost, weddingFunctions } = location.state || {};

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("weddingAllSelected"));
    setSelectedData(stored || {});
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    alert("Proceeding to payment...");

    const userEmail = localStorage.getItem("userEmail");
    const eventName = "Wedding Event";

    const selected = selectedData?.selected || {};
    const vendorType = selectedData?.vendorType || {};

    const vendors = [];

    Object.keys(selected).forEach((func) => {
      selected[func].forEach((service) => {
        const name =
          typeof service === "string"
            ? service
            : Object.values(service).join(""); 

        vendors.push({
          email: "tsujeet440@gmail.com",
          function: func,
          service: name,
          tier: vendorType[func]?.[name] || "low",
        });
      });
    });

    const response = await fetch("https://mits-y0ny.onrender.com/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vendors, userEmail, eventName }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Emails sent successfully!");
      navigate("/payment-success");
      localStorage.removeItem("weddingAllSelected");
    } else {
      alert("Failed to send emails.");
    }
  };

  if (!selectedData?.selected || !totalCost || !weddingFunctions) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 10 }}>
        Data missing or invalid. Please go back and try again.
      </Typography>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-20 bg-gradient-to-br from-pink-50 to-purple-100">
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", color: "#9c27b0", mb: 5 }}>
        Payment Details
      </Typography>

      <Card sx={{ borderRadius: "20px", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ color: "#9c27b0", fontWeight: "bold" }}>
            Wedding Package Details
          </Typography>

          {weddingFunctions.map((func, index) => {
            const services = selectedData?.selected?.[func] || [];

            return (
              <div key={index} className="mt-4">
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  {func}
                </Typography>
                <Grid container spacing={2}>
                  {services.length > 0 ? (
                    services.map((s, i) => {
                      const name = typeof s === "string" ? s : Object.values(s).join("");
                      const imgName = s?.imgName || "https://via.placeholder.com/300x200";
                      const tier = selectedData?.vendorType?.[func]?.[name] || "low";

                      return (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                          <Card sx={{ borderRadius: "12px", boxShadow: 1 }}>
                            {/* <img
                              src={`/images/${imgName}`} // 🖼️ Adjust path as needed
                              alt={name}
                              className="w-full h-40 object-cover rounded-t-xl"
                            /> */}
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                                {name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Vendor Tier: {tier}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                      No services selected for this function.
                    </Typography>
                  )}
                </Grid>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total Cost: ₹{totalCost}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handlePayment}
          disabled={loading}
          sx={{
            bgcolor: "#9c27b0",
            color: "white",
            fontWeight: "bold",
            py: 2,
            px: 6,
            borderRadius: "12px",
            boxShadow: 6,
            ":hover": { bgcolor: "#7b1fa2", boxShadow: 8 },
            mt: 2,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;

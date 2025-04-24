import React, { useState } from "react";
import { Button, TextField, Typography, Grid } from "@mui/material";

const SendEmail = () => {
  const [userEmail, setUserEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [vendors, setVendors] = useState([]);
  const [service, setService] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [tier, setTier] = useState("");

  const handleVendorAdd = () => {
    if (service && functionName && tier) {
      setVendors([...vendors, { service, function: functionName, tier, email: "vendor@example.com" }]);
      setService("");
      setFunctionName("");
      setTier("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userEmail,
      eventName,
      vendors
    };

    try {
      const response = await fetch("http://localhost:5000/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();
      if (response.ok) {
        alert("Emails sent successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Error sending emails.");
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Send Event Booking Emails
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <TextField
              label="User Email"
              variant="outlined"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Event Name"
              variant="outlined"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Add Vendor</Typography>
            <TextField
              label="Service"
              variant="outlined"
              value={service}
              onChange={(e) => setService(e.target.value)}
              fullWidth
            />
            <TextField
              label="Function"
              variant="outlined"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Tier"
              variant="outlined"
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleVendorAdd} sx={{ mt: 2 }}>
              Add Vendor
            </Button>
          </Grid>

          {vendors.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>Vendors Added</Typography>
              <ul>
                {vendors.map((vendor, index) => (
                  <li key={index}>
                    {vendor.service} for {vendor.function} (Tier: {vendor.tier})
                  </li>
                ))}
              </ul>
            </Grid>
          )}

          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Send Booking Confirmation
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SendEmail;

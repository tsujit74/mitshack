import React, { useState } from "react";
import {
  Card, CardContent, Typography, Button, Grid, Checkbox, FormControlLabel,
  Radio, RadioGroup, Snackbar, Alert
} from "@mui/material";

const collegeFestFunctions = [
  "Cultural Shows", "Tech Competitions", "Hackathons", "Live Concerts",
  "Workshops", "Food Stalls", "Gaming Tournaments", "Panel Discussions"
];

const services = [
  { name: "Catering", img: "/images/catering.jpg", prices: { low: 2000, medium: 4000, high: 7000 } },
  { name: "Event Planning", img: "/images/event.jpg", prices: { low: 1500, medium: 3000, high: 5000 } },
  { name: "Audio-Visual", img: "/images/audio.jpg", prices: { low: 1000, medium: 2500, high: 4000 } },
  { name: "Decoration", img: "/images/deco.jpg", prices: { low: 800, medium: 2000, high: 3500 } },
  { name: "Photography/Videography", img: "/images/photo.jpg", prices: { low: 1000, medium: 3000, high: 5000 } },
  { name: "Guest Speakers", img: "/images/dj.jpg", prices: { low: 3000, medium: 6000, high: 10000 } },
  { name: "Transportation", img: "/images/transport.jpg", prices: { low: 1000, medium: 3000, high: 5000 } },
  { name: "Security", img: "/images/security.jpg", prices: { low: 800, medium: 2000, high: 4000 } },
];

const CollegeFest = () => {
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState({});
  const [vendorType, setVendorType] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const toggleService = (func, service) => {
    setSelected((prev) => {
      const current = prev[func] || [];
      const updatedServices = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];

      return {
        ...prev,
        [func]: updatedServices,
      };
    });
  };

  const toggleSelectAll = (func) => {
    const isSelected = selectAll[func];
    setSelectAll((prev) => ({ ...prev, [func]: !isSelected }));
    setSelected((prev) => ({
      ...prev,
      [func]: !isSelected ? services.map((s) => s.name) : [],
    }));
  };

  const handleVendorTypeChange = (func, service, value) => {
    setVendorType((prev) => ({
      ...prev,
      [func]: {
        ...prev[func],
        [service]: value,
      },
    }));
  };

  const calculateTotalCost = (func) => {
    let total = 0;
    const funcServices = selected[func] || [];
    funcServices.forEach((service) => {
      const vendor = vendorType[func]?.[service] || "low";
      const serviceObj = services.find((s) => s.name === service);
      total += serviceObj.prices[vendor];
    });
    return total;
  };

  const handleSubmit = (func) => {
    if (!selected[func]?.length) {
      setOpenAlert(true);
      return;
    }
    const total = calculateTotalCost(func);
    console.log(`Confirmed ${func} with total: ₹${total}`, selected[func]);
    alert(`Package for ${func} confirmed! Check console.`);
  };

  return (
    <div className="min-h-screen p-6 pt-20 bg-gradient-to-br from-yellow-50 to-pink-100">
      <Typography variant="h3" align="center" className="font-bold text-pink-500 mb-10">
        Customize Your College Fest Package
      </Typography>

      {collegeFestFunctions.map((func) => (
        <div key={func} className="mb-10">
          <Card className="rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-300 to-pink-300 p-4 flex justify-between items-center">
              <Typography variant="h5" className="text-white font-bold">{func}</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll[func] || false}
                    onChange={() => toggleSelectAll(func)}
                    color="default"
                    sx={{ color: "white" }}
                  />
                }
                label="Select All"
                className="text-white"
              />
            </div>
            <CardContent>
              <Grid container spacing={3}>
                {services.map((service) => {
                  const isSelected = selected[func]?.includes(service.name);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={service.name}>
                      <Card
                        onClick={() => toggleService(func, service.name)}
                        sx={{
                          cursor: "pointer",
                          borderRadius: "12px",
                          boxShadow: 1,
                          "&:hover": { boxShadow: 6 },
                          border: isSelected ? "4px solid #ec4899" : "1px solid #e0e0e0",
                          transform: isSelected ? "scale(1.05)" : "scale(1)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <img src={service.img} alt={service.name} className="w-full h-40 object-cover rounded-t-xl" />
                        <CardContent sx={{ textAlign: "center" }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                            {service.name}
                          </Typography>
                        </CardContent>
                      </Card>

                      {isSelected && (
                        <div className="mt-3">
                          <Typography variant="body2">Vendor Type</Typography>
                          <RadioGroup
                            value={vendorType[func]?.[service.name] || "low"}
                            onChange={(e) => handleVendorTypeChange(func, service.name, e.target.value)}
                            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                          >
                            <FormControlLabel value="low" control={<Radio />} label={`Low: ₹${service.prices.low}`} />
                            <FormControlLabel value="medium" control={<Radio />} label={`Medium: ₹${service.prices.medium}`} />
                            <FormControlLabel value="high" control={<Radio />} label={`High: ₹${service.prices.high}`} />
                          </RadioGroup>
                        </div>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>

            <div className="text-center mt-4">
              <Typography variant="body2">Total Cost for {func}: ₹{calculateTotalCost(func)}</Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleSubmit(func)}
                disabled={!selected[func] || selected[func].length === 0}
                sx={{
                  bgcolor: "#ec4899",
                  color: "white",
                  fontWeight: "bold",
                  py: 2,
                  px: 6,
                  borderRadius: "12px",
                  boxShadow: 6,
                  ":hover": { bgcolor: "#db2777", boxShadow: 8 },
                  mt: 2,
                }}
              >
                Confirm {func} Package
              </Button>
            </div>
          </Card>
        </div>
      ))}

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="warning" sx={{ width: '100%' }}>
          Please select at least one service to proceed!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CollegeFest;

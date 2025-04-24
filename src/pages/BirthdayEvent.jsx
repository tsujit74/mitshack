import React, { useState, useEffect } from "react";
import {
  Card, CardContent, Typography, Button, Grid, Checkbox, FormControlLabel,
  Radio, RadioGroup, Snackbar, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const birthdayTypes = [
  "Kids Birthday", "Teen Birthday", "Adult Birthday", "Milestone Birthday"
];

const services = [
  { name: "Decorator", img: "/images/deco.jpg", prices: { low: 800, medium: 2000, high: 3500 }, description: "Colorful decoration for your special birthday." },
  { name: "Cake", img: "/images/cake.jpg", prices: { low: 500, medium: 1200, high: 2000 }, description: "Delicious custom-made cakes." },
  { name: "Games & Entertainment", img: "/images/games.jpg", prices: { low: 1000, medium: 2500, high: 4000 }, description: "Fun games and entertainers." },
  { name: "Photography", img: "/images/photo.jpg", prices: { low: 1500, medium: 3000, high: 6000 }, description: "Memories captured in style." },
  { name: "Catering", img: "/images/catering.jpg", prices: { low: 2000, medium: 5000, high: 10000 }, description: "Tasty food for your guests." },
  { name: "DJ & Music", img: "/images/dj.jpg", prices: { low: 1000, medium: 2500, high: 5000 }, description: "Energetic beats and party vibes." },
  { name: "Gifts", img: "/images/gifts.jpg", prices: { low: 400, medium: 1000, high: 2000 }, description: "Return gifts to delight your guests." },
];

const BirthdayEvent = () => {
  const [selected, setSelected] = useState(() => JSON.parse(localStorage.getItem("birthdaySelected")) || {});
  const [selectAll, setSelectAll] = useState({});
  const [vendorType, setVendorType] = useState(() => JSON.parse(localStorage.getItem("birthdayVendorType")) || {});
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("birthdaySelected", JSON.stringify(selected));
    localStorage.setItem("birthdayVendorType", JSON.stringify(vendorType));
  }, [selected, vendorType]);

  const handleSubmit = (type) => {
    if (!selected[type] || selected[type].length === 0) {
      setOpenAlert(true);
      return;
    }

    const totalCost = calculateTotalCost(type);

    navigate('/payment', {
      state: {
        selectedServices: selected,
        totalCost: totalCost,
        birthdayTypes: birthdayTypes,
      },
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleService = (type, service) => {
    setSelected((prev) => {
      const current = prev[type] || [];
      const updated = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      return { ...prev, [type]: updated };
    });
  };

  const toggleSelectAll = (type) => {
    const isAllSelected = selectAll[type];
    setSelectAll((prev) => ({ ...prev, [type]: !isAllSelected }));
    setSelected((prev) => ({
      ...prev,
      [type]: !isAllSelected ? services.map((s) => s.name) : [],
    }));
  };

  const handleVendorTypeChange = (type, service, value) => {
    setVendorType((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [service]: value,
      },
    }));
  };

  const calculateTotalCost = (type) => {
    let total = 0;
    const typeServices = selected[type] || [];
    typeServices.forEach((service) => {
      const vendor = vendorType[type]?.[service] || "low";
      const serviceObj = services.find((s) => s.name === service);
      total += serviceObj.prices[vendor];
    });
    return total;
  };

  return (
    <div className="min-h-screen p-6 pt-20 bg-gradient-to-br from-blue-50 to-purple-100">
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", color: "#3f51b5", mb: 5 }}>
        Birthday Package Selection
      </Typography>

      {birthdayTypes.map((type) => (
        <div key={type} className="mb-10">
          <Card sx={{ borderRadius: "20px", boxShadow: 3 }}>
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
                  {type}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectAll[type] || false}
                      onChange={() => toggleSelectAll(type)}
                      color="default"
                      sx={{ color: "white" }}
                    />
                  }
                  label="Select All"
                  className="text-white"
                />
              </div>
            </div>
            <CardContent>
              <Grid container spacing={3}>
                {services.map((service) => {
                  const isSelected = selected[type]?.includes(service.name);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={service.name}>
                      <Card
                        onClick={() => toggleService(type, service.name)}
                        sx={{
                          cursor: "pointer",
                          borderRadius: "12px",
                          boxShadow: 1,
                          "&:hover": { boxShadow: 6 },
                          border: isSelected ? "4px solid #3f51b5" : "1px solid #e0e0e0",
                          transform: isSelected ? "scale(1.05)" : "scale(1)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <img
                          src={service.img}
                          alt={service.name}
                          className="w-full h-40 object-cover rounded-t-xl"
                        />
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
                            value={vendorType[type]?.[service.name] || "low"}
                            onChange={(e) => handleVendorTypeChange(type, service.name, e.target.value)}
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
          </Card>

          <div className="mt-4 text-center">
            <Typography variant="body2">Total Cost for {type}: ₹{calculateTotalCost(type)}</Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleSubmit(type)}
              disabled={!selected[type] || selected[type].length === 0}
              sx={{
                bgcolor: "#3f51b5",
                color: "white",
                fontWeight: "bold",
                py: 2,
                px: 6,
                borderRadius: "12px",
                boxShadow: 6,
                ":hover": { bgcolor: "#303f9f", boxShadow: 8 },
                mt: 2,
              }}
            >
              Confirm {type} Package
            </Button>
          </div>
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

export default BirthdayEvent;
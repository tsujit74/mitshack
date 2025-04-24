import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const houseFunctions = [
  "Birthday at Home",
  "Festive Gathering",
  "Get-together",
  "Kitty Party",
  "Anniversary at Home",
  "Baby Shower",
  "Puja Ceremony",
];

const houseServices = [
  {
    name: "Catering",
    img: "/images/catering.jpg",
    prices: { low: 2000, medium: 5000, high: 8000 },
    description: "Delicious catering for your guests.",
  },
  {
    name: "Home Decor",
    img: "/images/deco.jpg",
    prices: { low: 1500, medium: 3000, high: 6000 },
    description: "Elegant home decoration.",
  },
  {
    name: "Sound System",
    img: "/images/dj.jpg",
    prices: { low: 1000, medium: 2500, high: 4000 },
    description: "DJ & sound for your gathering.",
  },
  {
    name: "Tent Setup",
    img: "/images/tent.jpg",
    prices: { low: 1200, medium: 2500, high: 4000 },
    description: "Tents for outdoor arrangements.",
  },
  {
    name: "Lighting",
    img: "/images/light.jpg",
    prices: { low: 800, medium: 2000, high: 3500 },
    description: "Beautiful ambient lighting.",
  },
  {
    name: "Photography",
    img: "/images/photo.jpg",
    prices: { low: 1500, medium: 4000, high: 7000 },
    description: "Capture your special moments.",
  },
  {
    name: "Return Gifts",
    img: "/images/gifts.jpg",
    prices: { low: 500, medium: 1500, high: 2500 },
    description: "Memorable gifts for guests.",
  },
  {
    name: "Clean-up Crew",
    img: "/images/clean.jpg",
    prices: { low: 600, medium: 1200, high: 2000 },
    description: "Post-event cleaning service.",
  },
];

const HouseEvent = () => {
  const [selected, setSelected] = useState({});
  const [vendorType, setVendorType] = useState({});
  const [selectAll, setSelectAll] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const toggleService = (func, serviceName) => {
    setSelected((prev) => {
      const current = prev[func] || [];
      const updated = current.includes(serviceName)
        ? current.filter((s) => s !== serviceName)
        : [...current, serviceName];
      return { ...prev, [func]: updated };
    });
  };

  const handleVendorTypeChange = (func, serviceName, value) => {
    setVendorType((prev) => ({
      ...prev,
      [func]: {
        ...prev[func],
        [serviceName]: value,
      },
    }));
  };

  const toggleSelectAll = (func) => {
    const isSelected = selectAll[func];
    setSelectAll((prev) => ({ ...prev, [func]: !isSelected }));
    setSelected((prev) => ({
      ...prev,
      [func]: !isSelected ? houseServices.map((s) => s.name) : [],
    }));
  };

  const calculateTotalCost = (func) => {
    let total = 0;
    const selectedServices = selected[func] || [];
    selectedServices.forEach((serviceName) => {
      const service = houseServices.find((s) => s.name === serviceName);
      const tier = vendorType[func]?.[serviceName] || "low";
      total += service.prices[tier];
    });
    return total;
  };

  const handleSubmit = () => {
    const hasAnySelected = Object.values(selected).some((arr) => arr.length > 0);
    if (!hasAnySelected) {
      setOpenAlert(true);
      return;
    }

    const selectedServices = Object.entries(selected).map(([func, services]) => ({
      eventType: func,
      services,
      totalCost: calculateTotalCost(func),
    }));

    navigate("/payment", {
      state: {
        eventCategory: "House Event",
        selectedServices,
      },
    });
  };

  return (
    <div className="min-h-screen p-6 pt-20 bg-gradient-to-br from-yellow-50 to-orange-100">
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", color: "#fb923c", mb: 5 }}>
        House Event Services
      </Typography>

      {houseFunctions.map((func) => (
        <div key={func} className="mb-10">
          <Card sx={{ borderRadius: "20px", boxShadow: 3 }}>
            <div className="bg-gradient-to-r from-orange-300 to-yellow-300 p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
                  {func}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectAll[func] || false}
                      onChange={() => toggleSelectAll(func)}
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
                {houseServices.map((service) => {
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
                          border: isSelected ? "4px solid #fb923c" : "1px solid #e0e0e0",
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
          </Card>
          <div className="mt-4 text-center">
                      <Typography variant="body2">Total Cost for {func}: ₹{calculateTotalCost(func)}</Typography>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => handleSubmit(func)}
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
                        Confirm {func} Package
                      </Button>
                    </div>
        </div>
      ))}

      <div className="text-center mt-10">
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#fb923c",
            color: "white",
            fontWeight: "bold",
            py: 2,
            px: 6,
            borderRadius: "12px",
            boxShadow: 6,
            ":hover": { bgcolor: "#f97316", boxShadow: 8 },
          }}
        >
          Confirm House Event Package
        </Button>
      </div>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="warning" sx={{ width: '100%' }}>
          Please select at least one service to proceed!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HouseEvent;

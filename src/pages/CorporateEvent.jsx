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
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const corporateFunctions = [
  "Conferences",
  "Team Building",
  "Workshops",
  "Product Launch",
  "Networking",
  "Seminars",
  "Award Ceremonies",
  "Panel Discussions",
];

const services = [
  {
    name: "Catering",
    img: "/images/catering.jpg",
    prices: { low: 3000, medium: 5000, high: 8000 },
  },
  {
    name: "Event Planning",
    img: "/images/event.jpg",
    prices: { low: 4000, medium: 7000, high: 10000 },
  },
  {
    name: "Audio-Visual",
    img: "/images/audio.jpg",
    prices: { low: 2000, medium: 4500, high: 7000 },
  },
  {
    name: "Decoration",
    img: "/images/deco.jpg",
    prices: { low: 2500, medium: 5500, high: 8000 },
  },
  {
    name: "Photography/Videography",
    img: "/images/photo.jpg",
    prices: { low: 3500, medium: 6000, high: 9500 },
  },
  {
    name: "Guest Speakers",
    img: "/images/dj.jpg",
    prices: { low: 5000, medium: 8000, high: 12000 },
  },
  {
    name: "Transportation",
    img: "/images/transport.jpg",
    prices: { low: 1500, medium: 3500, high: 5500 },
  },
  {
    name: "Security",
    img: "/images/security.jpg",
    prices: { low: 2000, medium: 4000, high: 6000 },
  },
];

const CorporateEvent = () => {
  const [selected, setSelected] = useState({});
  const [vendorType, setVendorType] = useState({});
  const [selectAll, setSelectAll] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const toggleService = (func, service) => {
    setSelected((prev) => {
      const current = prev[func] || [];
      const updatedServices = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];

      return { ...prev, [func]: updatedServices };
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

  const handleSubmit = () => {
    const hasAnySelection = Object.values(selected).some((arr) => arr.length > 0);
    if (!hasAnySelection) {
      setOpenAlert(true);
      return;
    }

    const selectedServices = Object.entries(selected).map(([func, services]) => ({
      eventType: func,
      services,
      totalCost: calculateTotalCost(func),
    }));

    const totalCost = selectedServices.reduce((sum, item) => sum + item.totalCost, 0);

    navigate("/payment", {
      state: {
        eventCategory: "Corporate Event",
        selectedServices,
        totalCost,
      },
    });
  };

  return (
    <div className="min-h-screen p-6 pt-20 bg-gradient-to-br from-blue-50 to-green-100">
      <Typography variant="h3" align="center" className="font-bold text-blue-500 mb-10">
        Corporate Event Package Selection
      </Typography>

      {corporateFunctions.map((func) => (
        <div key={func} className="mb-10">
          <Card className="rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-300 to-green-300 p-4">
              <div className="flex items-center justify-between">
                <Typography variant="h5" className="text-white font-bold">
                  {func}
                </Typography>
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
            </div>
            <CardContent>
              <Grid container spacing={3}>
                {services.map((service) => {
                  const isSelected = selected[func]?.includes(service.name);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={service.name}>
                      <Card
                        onClick={() => toggleService(func, service.name)}
                        className={`cursor-pointer transition-all duration-300 rounded-xl shadow-md hover:shadow-xl ${
                          isSelected
                            ? "border-4 border-blue-400 scale-105"
                            : "border border-gray-200"
                        }`}
                      >
                        <img
                          src={service.img}
                          alt={service.name}
                          className="w-full h-40 object-cover rounded-t-xl"
                        />
                        <CardContent className="text-center">
                          <Typography variant="subtitle1" className="font-medium">
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
          className="bg-gradient-to-r from-blue-400 to-green-400 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:from-blue-500 hover:to-green-500"
        >
          Confirm Corporate Event Package
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

export default CorporateEvent;

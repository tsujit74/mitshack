import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const weddingFunctions = [
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Reception",
  "Pre-Wedding Shoot",
  "Engagement",
  "Bachelor / Bachelorette Party",
  "Main Ceremony",
];

const services = [
  { name: "Makeup Artist", img: "/images/makeup.jpg", prices: { low: 500, medium: 1500, high: 3000 }, description: "Professional makeup services for bride and groom." },
  { name: "Photographer/Videographer", img: "/images/photo.jpg", prices: { low: 2000, medium: 5000, high: 10000 }, description: "Capturing your most cherished wedding moments." },
  { name: "Caterers", img: "/images/catering.jpg", prices: { low: 3000, medium: 8000, high: 15000 }, description: "Delicious food to satisfy your guests." },
  { name: "Decoration", img: "/images/deco.jpg", prices: { low: 1000, medium: 2500, high: 5000 }, description: "Beautiful wedding decorations for every occasion." },
  { name: "Mehndi", img: "/images/mehdi.jpg", prices: { low: 500, medium: 1500, high: 2500 }, description: "Traditional henna designs for the bride." },
  { name: "Sound & DJ", img: "/images/dj.jpg", prices: { low: 800, medium: 2500, high: 5000 }, description: "Music and entertainment for your wedding celebrations." },
  { name: "Transport / Vehicles", img: "/images/transport.jpg", prices: { low: 1500, medium: 4000, high: 7000 }, description: "Luxury transport for the bride, groom, and guests." },
  { name: "Return Gifts", img: "/images/gifts.jpg", prices: { low: 500, medium: 1500, high: 3000 }, description: "Memorable return gifts for your guests." },
];

const WeddingEvent = () => {
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState({});
  const [vendorType, setVendorType] = useState({});
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = (func) => {
    console.log(`Selected Wedding Package for ${func}:`, selected[func]);
  
    const selectedForFunc = selected[func] || [];
    const vendorTypesForFunc = vendorType[func] || {};
    const totalCost = calculateTotalCost(func);
  
    // Add only the image file names for clarity (e.g., "name.jpg")
    const selectedWithImageNames = selectedForFunc.map(service => ({
      ...service,
      imgName: service.img?.split("/").pop() || "", // Extracts file name from path
    }));
  
    const dataToStore = {
      function: func,
      selectedServices: selectedWithImageNames,
      vendorTypes: vendorTypesForFunc,
      totalCost: totalCost,
    };
  
    localStorage.setItem(`weddingPackage_${func}`, JSON.stringify(dataToStore));
  
    // Store all selected data globally with imgName added
    const selectedWithImages = {};
    Object.keys(selected).forEach((f) => {
      selectedWithImages[f] = selected[f].map(service => ({
        ...service,
        imgName: service.img?.split("/").pop() || "",
      }));
    });
  
    localStorage.setItem("weddingAllSelected", JSON.stringify({
      selected: selectedWithImages,
      vendorType,
      totalCost: calculateTotalCost(),
    }));
  
    // Navigate to payment page with state
    navigate('/payment', {
      state: {
        selectedServices: selectedWithImages,
        totalCost: totalCost,
        weddingFunctions: weddingFunctions,
      },
    });
  };
  

  const toggleService = (func, service) => {
    setSelected((prev) => {
      const current = prev[func] || [];
      return {
        ...prev,
        [func]: current.includes(service)
          ? current.filter((s) => s !== service)
          : [...current, service],
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

  return (
    <div className="min-h-screen p-6 pt-20 bg-gradient-to-br from-pink-50 to-purple-100">
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", color: "#9c27b0", mb: 5 }}>
        Wedding Package Selection
      </Typography>

      {weddingFunctions.map((func) => (
        <div key={func} className="mb-10">
          <Card sx={{ borderRadius: "20px", boxShadow: 3 }}>
            <div className="bg-gradient-to-r from-purple-300 to-pink-300 p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
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
                        sx={{
                          cursor: "pointer",
                          borderRadius: "12px",
                          boxShadow: 1,
                          "&:hover": { boxShadow: 6 },
                          border: isSelected ? "4px solid #9c27b0" : "1px solid #e0e0e0",
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
    </div>
  );
};

export default WeddingEvent;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const EventPage = ({ eventType, eventFunctions, services }) => {
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState({});

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

  const handleSubmit = () => {
    console.log(`${eventType} Package Selected:`, selected);
    alert(`${eventType} package selected! Check console for data.`);
  };

  return (
    <div className="min-h-screen p-6 pt-20 bg-gradient-to-br from-pink-50 to-purple-100">
      <Typography variant="h3" align="center" className="font-bold text-purple-500 mb-10">
        Plan Your {eventType} Event
      </Typography>

      {eventFunctions.map((func) => (
        <div key={func} className="mb-10">
          <Card className="rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-300 to-pink-300 p-4">
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
                            ? "border-4 border-purple-400 scale-105"
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
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}

      <div className="mt-10 text-center">
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-500"
        >
          Confirm {eventType} Package
        </Button>
      </div>
    </div>
  );
};

export default EventPage;

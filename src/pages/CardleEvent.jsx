import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Fade,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const cardleEvents = [
  "Cardle Championship",
  "Cardle Coding Duel",
  "Cardle Quiz Arena",
  "Cardle Speedrun",
  "Cardle Strategy Showdown",
];

const services = [
    { name: "Card Table Setup", img: "/images/Hero.jpg" },
    { name: "Scoreboard & Display", img: "/images/Hero.jpg" },
    { name: "Commentary Booth", img: "/images/Hero.jpg" },
    { name: "Participant Kits", img: "/images/Hero.jpg" },
    { name: "Live Stream Setup", img: "/images/Hero.jpg" },
    { name: "Volunteer Crew", img: "/images/Hero.jpg" },
    { name: "Cardle Merchandise", img: "/images/Hero.jpg" },
    { name: "Security & Safety", img: "/images/Hero.jpg" },
  ];

const CollegeFestEvent = () => {
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState({});

  const toggleService = (event, service) => {
    setSelected((prev) => {
      const current = prev[event] || [];
      return {
        ...prev,
        [event]: current.includes(service)
          ? current.filter((s) => s !== service)
          : [...current, service],
      };
    });
  };

  const toggleSelectAll = (event) => {
    setSelectAll((prev) => {
      const isSelected = prev[event];
      return {
        ...prev,
        [event]: !isSelected,
      };
    });

    setSelected((prev) => {
      const updatedSelected = { ...prev };
      if (selectAll[event]) {
        updatedSelected[event] = [];
      } else {
        updatedSelected[event] = services.map((service) => service.name);
      }
      return updatedSelected;
    });
  };

  const handleSubmit = () => {
    console.log("Selected Cardle Event Package:", selected);
    alert("Cardle event package selected! Check console for data.");
  };

  return (
    <div
      className="p-6 bg-gradient-to-br from-indigo-50 to-cyan-100 min-h-screen mt-14"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1e88e5" }}
      >
        🃏 Customize Your Cardle Event 🃏
      </Typography>

      {cardleEvents.map((event, index) => (
        <Fade in={true} timeout={700 + index * 200} key={event}>
          <Card
            sx={{
              mt: 4,
              padding: 2,
              boxShadow: 6,
              borderRadius: 4,
              backgroundColor: "#ffffffd9",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#3949ab", fontWeight: "600" }}
              >
                {event}
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAll[event] || false}
                    onChange={() => toggleSelectAll(event)}
                    color="primary"
                  />
                }
                label="Select All"
              />

              <Grid container spacing={3}>
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.name}>
                    <Card
                      onClick={() => toggleService(event, service.name)}
                      sx={{
                        cursor: "pointer",
                        border: selected[event]?.includes(service.name)
                          ? "3px solid #1e88e5"
                          : "1px solid #e0e0e0",
                        transition: "0.3s",
                        borderRadius: 3,
                        boxShadow: selected[event]?.includes(service.name)
                          ? 6
                          : 2,
                        transform: selected[event]?.includes(service.name)
                          ? "scale(1.02)"
                          : "scale(1)",
                      }}
                    >
                      <CardContent>
                        <img
                          src={service.img}
                          alt={service.name}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            marginBottom: 10,
                            borderRadius: "50%",
                          }}
                        />
                        <Typography
                          variant="body1"
                          align="center"
                          sx={{ fontWeight: 500 }}
                        >
                          {service.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      ))}

      <div className="mt-8 text-center">
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{
            mt: 4,
            background: "linear-gradient(to right, #1e88e5, #42a5f5)",
            color: "white",
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: 3,
            fontWeight: "bold",
            '&:hover': {
              background: "linear-gradient(to right, #1565c0, #1e88e5)",
            },
          }}
        >
          Confirm Cardle Package
        </Button>
      </div>
    </div>
  );
};

export default CollegeFestEvent;
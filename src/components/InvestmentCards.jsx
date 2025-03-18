import { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import axios from "axios";

export default function InvestmentCards() {
  const [investments, setInvestments] = useState([
    {
      title: "Current Investment Value",
      amount: "Loading...",
      change: "",
      isPositive: true,
    },
    {
      title: "Initial Investment Value",
      amount: "Loading...",
      change: "",
      isPositive: true,
    },
    {
      title: "Best Performing Scheme",
      amount: "Loading...",
      change: "",
      isPositive: true,
    },
    {
      title: "Worst Performing Scheme",
      amount: "Loading...",
      change: "",
      isPositive: false,
    },
  ]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/investment_overview")
      .then(response => {
        const data = response.data;

        // Calculate return percentage dynamically
        const returnPercentage = ((data.current_investment_value - data.initial_investment_value) / data.initial_investment_value) * 100;
        const isReturnPositive = returnPercentage >= 0;

        setInvestments([
          {
            title: "Current Investment Value",
            amount: `₹${data.current_investment_value.toLocaleString()}`,
            change: `${returnPercentage.toFixed(1)}%`,
            isPositive: isReturnPositive,
          },
          {
            title: "Initial Investment Value",
            amount: `₹${data.initial_investment_value.toLocaleString()}`,
            change: `${data.initial_investment_growth}%`,
            isPositive: true, // Always positive
          },
          {
            title: "Best Performing Scheme",
            amount: data.best_performing_scheme.name || "N/A",
            change: `${data.best_performing_scheme.returns}%`,
            isPositive: data.best_performing_scheme.returns >= 0,
          },
          {
            title: "Worst Performing Scheme",
            amount: data.worst_performing_scheme.name || "N/A",
            change: `${data.worst_performing_scheme.returns}%`,
            isPositive: data.worst_performing_scheme.returns >= 0,
          },
        ]);
      })
      .catch(error => {
        console.error("Error fetching investment overview:", error);
      });
  }, []);

  return (
    <Grid 
      container 
      spacing={2} 
      justifyContent="center"
      sx={{ mb: 6, mt: 2, gap: 1 }}
    >
      {investments.map((item, index) => (
        <Grid item key={index}>
          <Paper
            sx={{
              width: "200px",
              height: "100px",
              bgcolor: "#112240",
              color: "white",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                {item.title}
              </Typography>
              {item.change && (
                <Typography
                  sx={{
                    color: item.isPositive ? "#4ADE80" : "#EF4444",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  {item.isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                  {item.change}
                </Typography>
              )}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {item.amount}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

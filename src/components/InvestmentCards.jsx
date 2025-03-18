import { Grid, Paper, Typography, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

export default function InvestmentCards({ investmentData, loading }) {
  if (loading || !investmentData) {
    return (
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 6, mt: 2, gap: 1 }}>
        {["Current Investment Value", "Initial Investment Value", "Best Performing Scheme", "Worst Performing Scheme"]
          .map((title, index) => (
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
                <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                  {title}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Loading...
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    );
  }

  // Safely calculate return percentage
  const returnPercentage = investmentData.initial_investment_value
    ? ((investmentData.current_investment_value - investmentData.initial_investment_value) /
       investmentData.initial_investment_value) * 100
    : 0;
  const isReturnPositive = returnPercentage >= 0;

  const investments = [
    {
      title: "Current Investment Value",
      amount: `₹${investmentData.current_investment_value.toLocaleString()}`,
      change: `${returnPercentage.toFixed(1)}%`,
      isPositive: isReturnPositive,
    },
    {
      title: "Initial Investment Value",
      amount: `₹${investmentData.initial_investment_value.toLocaleString()}`,
      change: `${investmentData.initial_investment_growth}%`,
      isPositive: true, // Always positive
    },
    {
      title: "Best Performing Scheme",
      amount: investmentData.best_performing_scheme?.name || "N/A",
      change: `${investmentData.best_performing_scheme?.returns || 0}%`,
      isPositive: (investmentData.best_performing_scheme?.returns || 0) >= 0,
    },
    {
      title: "Worst Performing Scheme",
      amount: investmentData.worst_performing_scheme?.name || "N/A",
      change: `${investmentData.worst_performing_scheme?.returns || 0}%`,
      isPositive: (investmentData.worst_performing_scheme?.returns || 0) >= 0,
    },
  ];

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mb: 6, mt: 2, gap: 1 }}>
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

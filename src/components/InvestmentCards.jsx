import { Grid, Paper, Typography, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const investments = [
  {
    title: "Current Investment Value",
    amount: "₹5,75,000",
    change: "+0.6%",
    isPositive: true,
  },
  {
    title: "Initial Investment Value",
    amount: "₹5,00,000",
    change: "+15%",
    isPositive: true,
  },
  {
    title: "Best Performing Scheme",
    amount: "ICICI Prudential Midcap Fund",
    change: "+19%",
    isPositive: true,
  },
  {
    title: "Worst Performing Scheme",
    amount: "Axis Flexi Cap Fund",
    change: "-5%",
    isPositive: false,
  },
];

export default function InvestmentCards() {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {investments.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#1E2A38",
              color: "white",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  color: item.isPositive ? "#4ADE80" : "#EF4444",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                {item.change}
              </Typography>
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

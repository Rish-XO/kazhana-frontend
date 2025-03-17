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
    <Grid 
      container 
      spacing={2} 
      justifyContent="center"
      sx={{ mb: 4, mt: 2, gap: 1 }}
    >
      {investments.map((item, index) => (
        <Grid item key={index}>
          <Paper
            sx={{
              width: "200px",
              height: "100px",
              bgcolor: "#112240", // Adjusted to match screenshot
              color: "white",
              padding: "16px", // Exact padding
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

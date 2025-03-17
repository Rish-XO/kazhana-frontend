import { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper, Grid, Button } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample Performance Data
const performanceData = [
  { date: "7 Feb", value: 520000 },
  { date: "12 Feb", value: 530000 },
  { date: "17 Feb", value: 510000 },
  { date: "22 Feb", value: 540000 },
  { date: "27 Feb", value: 560000 },
  { date: "4 Mar", value: 570000 },
  { date: "9 Mar", value: 590000 },
];

// Sample Sector Allocation Data
const sectorAllocation = [
  { name: "Financial", percentage: 34, amount: "₹1,96,000" },
  { name: "Healthcare", percentage: 14.5, amount: "₹83,750" },
  { name: "Technology", percentage: 19, amount: "₹110,000" },
  { name: "Consumer Goods", percentage: 9.5, amount: "₹55,000" },
  { name: "Energy", percentage: 9.5, amount: "₹55,000" },
  { name: "Other Sectors", percentage: 9.5, amount: "₹55,000" },
];

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTimeframe, setActiveTimeframe] = useState("1M");

  return (
    <Box sx={{ mt: 4 }}>
      {/* Tabs for Switching */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#1E90FF" }, // Indicator color
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "normal",
              color: "#A0AEC0",
              "&.Mui-selected": {
                color: "white",
                fontWeight: "bold",
              },
              "&:focus": {
                outline: "none", // Removes white border
              },
            },
          }}
        >
          <Tab
            label="Performance Metrics"
            sx={{
              "&:focus": { outline: "none" }, // Extra safeguard to remove focus outline
            }}
          />
          <Tab
            label="Portfolio Composition"
            sx={{
              "&:focus": { outline: "none" }, // Extra safeguard to remove focus outline
            }}
          />
        </Tabs>
      </Box>

      {/* Performance Metrics Content */}
      {activeTab === 0 && (
        <Paper sx={{ p: 3, bgcolor: "#1B1A1A" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
            Performance Summary
          </Typography>
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: "10px",
              bgcolor: "#262626", 
              width: "fit-content", 
            }}
          >
            <Typography variant="h4" sx={{ color: "white"  }}>
              ₹5,50,000
            </Typography>
            <Typography variant="body2" sx={{ color: "#4ADE80", mt: 1 }}>
              ↑ ₹50,000 | 10%
            </Typography>
          </Box>

          {/* Performance Chart */}
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0077B6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0077B6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#2D3748"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#A0AEC0", fontSize: 12 }}
                />
                <YAxis hide={true} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0077B6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          {/* Timeframe Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
            {["1M", "3M", "6M", "1Y", "3Y", "MAX"].map((period) => (
              <Button
                key={period}
                variant={activeTimeframe === period ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => setActiveTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </Box>
        </Paper>
      )}

      {/* Portfolio Composition Content */}
      {activeTab === 1 && (
        <Paper sx={{ p: 3, bgcolor: "#1B1A1A" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
            Sector Allocation
          </Typography>
          <Grid container spacing={1}>
            {sectorAllocation.map((sector) => (
              <Grid
                item
                xs={12}
                sm={sector.percentage > 30 ? 6 : 3}
                key={sector.name}
              >
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "rgba(226, 232, 240, 0.1)",
                    color: "white",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#A0AEC0", mb: 1 }}>
                    {sector.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {sector.percentage}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#A0AEC0" }}>
                    {sector.amount}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
}

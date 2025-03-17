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
  Sankey,
  Rectangle,
  Layer,
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

// Sample Sector Allocation Data (Sorted Dynamically)
const sectorAllocation = [
  { name: "Financial", percentage: 34, amount: "₹1,96,000" },
  { name: "Healthcare", percentage: 14.5, amount: "₹83,750" },
  { name: "Technology", percentage: 19, amount: "₹110,000" },
  { name: "Consumer Goods", percentage: 9.5, amount: "₹55,000" },
  { name: "Energy", percentage: 9.5, amount: "₹55,000" },
  { name: "Other Sectors", percentage: 9.5, amount: "₹55,000" },
].sort((a, b) => b.percentage - a.percentage); // Sort dynamically by percentage

// Sample Fund Overlap Data for Sankey Chart
const fundOverlapData = {
  nodes: [
    { name: "Nippon Large Cap Fund" },
    { name: "Motilal Large Cap Fund" },
    { name: "HDFC Large Cap Fund" },
    { name: "ICICI Prudential Midcap Fund" },
    { name: "HDFC LTD" },
    { name: "RIL" },
    { name: "INFY" },
    { name: "TCS" },
    { name: "HDFCBANK" },
    { name: "BHARTIARTL" },
  ],
  links: [
    { source: 0, target: 4, value: 8 },
    { source: 0, target: 5, value: 6 },
    { source: 0, target: 6, value: 5 },
    { source: 0, target: 7, value: 4 },
    { source: 0, target: 8, value: 3 },
    { source: 0, target: 9, value: 2 },
    { source: 1, target: 4, value: 7 },
    { source: 1, target: 5, value: 6 },
    { source: 1, target: 6, value: 5 },
    { source: 1, target: 7, value: 4 },
    { source: 1, target: 8, value: 3 },
    { source: 1, target: 9, value: 2 },
    { source: 2, target: 4, value: 5 },
    { source: 2, target: 5, value: 4 },
    { source: 2, target: 6, value: 3 },
    { source: 2, target: 7, value: 2 },
    { source: 3, target: 8, value: 4 },
    { source: 3, target: 9, value: 3 },
  ],
};

// Custom Sankey Node component
const CustomSankeyNode = ({ x, y, width, height, index, payload }) => {
  // Left side fund nodes
  const isFundNode = index < 4;
  const colors = ["#C39B77", "#3A6EA5", "#8D6E63", "#7D8C38"];
  const stockColors = ["#FFC107", "#4CAF50", "#9C27B0", "#00BCD4", "#F44336", "#FF9800"];

  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={isFundNode ? colors[index % colors.length] : stockColors[(index - 4) % stockColors.length]}
      fillOpacity={0.9}
    />
  );
};

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTimeframe, setActiveTimeframe] = useState("1M");

  // Calculate total percentage for the first row (first 3 sectors)
  const firstRowTotal = sectorAllocation.slice(0, 3).reduce((sum, sector) => sum + sector.percentage, 0);
  
  // Calculate total percentage for the second row (remaining sectors)
  const secondRowTotal = sectorAllocation.slice(3).reduce((sum, sector) => sum + sector.percentage, 0);

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
            "& .MuiTabs-indicator": { backgroundColor: "#1E90FF" },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "normal",
              color: "#A0AEC0",
              "&.Mui-selected": { color: "white", fontWeight: "bold" },
              "&:focus": { outline: "none" },
            },
          }}
        >
          <Tab label="Performance Metrics" sx={{ "&:focus": { outline: "none" } }} />
          <Tab label="Portfolio Composition" sx={{ "&:focus": { outline: "none" } }} />
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
            <Typography variant="h4" sx={{ color: "white" }}>
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
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#A0AEC0", fontSize: 12 }} />
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
        <>
          <Paper sx={{ p: 3, bgcolor: "#1B1A1A", borderRadius: "10px" }}>
            <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
              Sector Allocation
            </Typography>

            {/* First Row - Top 3 Sectors */}
            <Box sx={{ display: "flex", mb: 2, gap: 2, width: "100%" }}>
              {sectorAllocation.slice(0, 3).map((sector, index) => (
                <Paper
                  key={sector.name}
                  sx={{
                    p: 3,
                    bgcolor: index === 0 ? "#8AA6C1" : index === 1 ? "#AAB9D1" : "#CFCFE8",
                    color: "#0F172A",
                    textAlign: "left",
                    borderRadius: "12px",
                    flex: `${sector.percentage / firstRowTotal}`,
                    minHeight: 160,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "600" }}>
                    {sector.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#374151" }}>
                    {sector.amount}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                    {sector.percentage}%
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* Second Row - Remaining Sectors */}
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              {sectorAllocation.slice(3).map((sector) => (
                <Paper
                  key={sector.name}
                  sx={{
                    p: 3,
                    bgcolor: "#CFCFE8",
                    color: "#0F172A",
                    textAlign: "left",
                    borderRadius: "12px",
                    flex: `${sector.percentage / secondRowTotal}`,
                    minHeight: 120,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "600" }}>
                    {sector.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#374151" }}>
                    {sector.amount}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                    {sector.percentage}%
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>

          {/* Fund Overlap Analysis - Sankey Chart */}
          <Paper sx={{ p: 3, bgcolor: "#1B1A1A", borderRadius: "10px", mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
              Overlap Analysis
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "#A0AEC0" }}>
              Comparing: Motilal Large Cap Fund and Nippon Large Cap Fund
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#FFC107", mr: 1 }}></Box>
                <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                  X Stocks Overlap across these funds.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4CAF50", mr: 1 }}></Box>
                <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                  Y% Average Overlap in holdings.
                </Typography>
              </Box>
            </Box>

            {/* Sankey Chart */}
            <Box sx={{ height: 400, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <Sankey
                  data={fundOverlapData}
                  node={<CustomSankeyNode />}
                  link={{ stroke: "#374151", strokeOpacity: 0.2 }}
                  nodePadding={50}
                  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                  <Tooltip />
                </Sankey>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}
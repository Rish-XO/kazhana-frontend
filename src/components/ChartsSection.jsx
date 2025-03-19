import { useEffect, useState } from "react";
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
import axios from "axios";

// Sample Sector Allocation Data (Sorted Dynamically)
// const sectorAllocation = [
//   { name: "Financial", percentage: 34, amount: "₹1,96,000" },
//   { name: "Healthcare", percentage: 14.5, amount: "₹83,750" },
//   { name: "Technology", percentage: 19, amount: "₹110,000" },
//   { name: "Consumer Goods", percentage: 9.5, amount: "₹55,000" },
//   { name: "Energy", percentage: 9.5, amount: "₹55,000" },
//   { name: "Other Sectors", percentage: 9.5, amount: "₹55,000" },
// ].sort((a, b) => b.percentage - a.percentage); // Sort dynamically by percentage

// Sample Fund Overlap Data for Sankey Chart
// const fundOverlapData = {
//   nodes: [
//     { name: "Nippon Large Cap Fund" },
//     { name: "Motilal Large Cap Fund" },
//     { name: "HDFC Large Cap Fund" },
//     { name: "ICICI Prudential Midcap Fund" },
//     { name: "HDFC LTD" },
//     { name: "RIL" },
//     { name: "INFY" },
//     { name: "TCS" },
//     { name: "HDFCBANK" },
//     { name: "BHARTIARTL" },
//   ],
//   links: [
//     { source: 0, target: 4, value: 8 },
//     { source: 0, target: 5, value: 6 },
//     { source: 0, target: 6, value: 5 },
//     { source: 0, target: 7, value: 4 },
//     { source: 0, target: 8, value: 3 },
//     { source: 0, target: 9, value: 2 },
//     { source: 1, target: 4, value: 7 },
//     { source: 1, target: 5, value: 6 },
//     { source: 1, target: 6, value: 5 },
//     { source: 1, target: 7, value: 4 },
//     { source: 1, target: 8, value: 3 },
//     { source: 1, target: 9, value: 2 },
//     { source: 2, target: 4, value: 5 },
//     { source: 2, target: 5, value: 4 },
//     { source: 2, target: 6, value: 3 },
//     { source: 2, target: 7, value: 2 },
//     { source: 3, target: 8, value: 4 },
//     { source: 3, target: 9, value: 3 },
//   ],
// };

// Custom Sankey Node component
// Replace your current CustomSankeyNode with this combined version
const CustomSankeyNode = ({ x, y, width, height, index, payload }) => {
  const isFundNode = index < 5; // Funds are in the first 5 indices
  const colors = ["#C39B77", "#3A6EA5", "#8D6E63", "#7D8C38", "#DDA15E"];
  const stockColors = [
    "#FFC107",
    "#4CAF50",
    "#9C27B0",
    "#00BCD4",
    "#F44336",
    "#FF9800",
  ];

  // Adjust text positioning
  const textAnchor = isFundNode ? "end" : "start";
  const textX = isFundNode ? x - 20 : x + width + 10; // Adjusted left padding

  return (
    <Layer>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={
          isFundNode
            ? colors[index % colors.length]
            : stockColors[(index - 5) % stockColors.length]
        }
        fillOpacity={0.9}
      />
      <text
        x={textX}
        y={y + height / 2}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        fill="#FFFFFF"
        fontSize={12}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }} // Prevents overlap
      >
        {payload.name.length > 20
          ? payload.name.substring(0, 20) + "..."
          : payload.name}
      </text>
    </Layer>
  );
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTimeframe, setActiveTimeframe] = useState("1M");
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sectorAllocation, setSectorAllocation] = useState([]);
  const [hoveredSector, setHoveredSector] = useState(null);
  const [fundOverlapData, setFundOverlapData] = useState(null);

  useEffect(() => {
    async function fetchFundOverlap() {
      try {
        const response = await axios.get(`${API_BASE_URL}/fund_overlap`);
        setFundOverlapData(response.data);
      } catch (error) {
        console.error("Error fetching fund overlap data:", error);
      }
    }
    fetchFundOverlap();
  }, []);

  useEffect(() => {
    async function fetchPerformanceData() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/performance_summary?timeframe=${activeTimeframe}`
        );
        setPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching performance summary:", error);
      }
      setLoading(false);
    }
    fetchPerformanceData();
  }, [activeTimeframe]); // Refetch data when timeframe changes

  useEffect(() => {
    async function fetchSectorAllocation() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/sector_allocation`
        );
        setSectorAllocation(response.data); // Set API data
      } catch (error) {
        console.error("Error fetching sector allocation:", error);
      }
      setLoading(false);
    }

    fetchSectorAllocation();
  }, []);

  if (loading || !performanceData) {
    return (
      <Typography sx={{ color: "white", textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }

  // Normalize sector allocation percentages so they sum to 100%
  const totalInvestment = sectorAllocation.reduce(
    (sum, sector) => sum + sector.amount,
    0
  );

  const normalizedSectorAllocation = sectorAllocation.map((sector) => ({
    ...sector,
    percentage: ((sector.amount / totalInvestment) * 100).toFixed(2), // Ensures total is 100%
  }));

  const sortedSectorAllocation = [...sectorAllocation]
  .map((sector) => ({
    ...sector,
    percentage: ((sector.amount / totalInvestment) * 100).toFixed(2), // Ensures total is 100%
  }))
  .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)); // Sort by percentage

//   // Calculate total percentage for the first row (first 3 sectors)
//   const firstRowTotal = sectorAllocation
//     .slice(0, 3)
//     .reduce((sum, sector) => sum + sector.percentage, 0);

//   // Calculate total percentage for the second row (remaining sectors)
//   const secondRowTotal = sectorAllocation
//     .slice(3)
//     .reduce((sum, sector) => sum + sector.percentage, 0);

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
          <Tab
            label="Performance Metrics"
            sx={{ "&:focus": { outline: "none" } }}
          />
          <Tab
            label="Portfolio Composition"
            sx={{ "&:focus": { outline: "none" } }}
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
            <Typography variant="h4" sx={{ color: "white" }}>
              ₹{performanceData.current_investment_value.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ color: "#4ADE80", mt: 1 }}>
              ↑ ₹
              {(
                performanceData.current_investment_value -
                performanceData.initial_investment_value
              ).toLocaleString()}{" "}
              |
              {(
                ((performanceData.current_investment_value -
                  performanceData.initial_investment_value) /
                  performanceData.initial_investment_value) *
                100
              ).toFixed(2)}
              %
            </Typography>
          </Box>

          {/* Performance Chart */}
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData.history}
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
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}
          >
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

            {/* Sector Allocation Cards - Fixed to be proportional to percentage */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {sortedSectorAllocation.map((sector) => (
                <Paper
                  key={sector.name}
                  onMouseEnter={() => setHoveredSector(sector)}
                  onMouseLeave={() => setHoveredSector(null)}
                  sx={{
                    p: 3,
                    bgcolor: hoveredSector?.name === sector.name ? "#3A6EA5" : "#8AA6C1",
                    color: "#0F172A",
                    borderRadius: "12px",
                    // Width is proportional to percentage
                    width: `calc(${sector.percentage}% - 16px)`,
                    minWidth: "200px", // Minimum width for small percentages
                    minHeight: "160px",
                    transition: "all 0.3s ease-in-out",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {hoveredSector?.name === sector.name && sector.sub_allocations ? (
                    // Only show sub-allocations when hovered, completely replacing parent content
                    <Box sx={{ height: "100%", width: "100%" }}>
                      <Grid container spacing={1.5}>
                        {sector.sub_allocations.map((sub) => (
                          <Grid 
                            item 
                            key={sub.name}
                            // Size based on percentage within the sub-allocations
                            xs={12} 
                            sm={sub.percentage >= 20 ? 6 : 4}
                          >
                            <Paper
                              sx={{
                                p: 2,
                                bgcolor: "#D6E4F0",
                                borderRadius: "8px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                                {sub.name}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                                {sub.percentage}%
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ) : (
                    // Normal view (not hovered) - show parent card details
                    <>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: "600" }}>
                          {sector.name}
                        </Typography>
                        <Typography variant="body2">
                          ₹{sector.amount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                        {sector.percentage}%
                      </Typography>
                    </>
                  )}
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
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#FFC107",
                    mr: 1,
                  }}
                ></Box>
                <Typography variant="body2" sx={{ color: "#A0AEC0" }}>
                  X Stocks Overlap across these funds.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#4CAF50",
                    mr: 1,
                  }}
                ></Box>
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
                  link={{ stroke: "#374151", strokeOpacity: 0.4 }}
                  nodePadding={60} // Increased padding to prevent overlap
                  nodeWidth={20} // Adjust width for better spacing
                  margin={{ top: 10, right: 180, bottom: 10, left: 180 }} // Adjust margins for text visibility
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

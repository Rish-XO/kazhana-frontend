import { Box, Typography } from "@mui/material";
import DashboardAppBar from "./components/AppBar";
import Sidebar from "./components/Sidebar";
import InvestmentCards from "./components/InvestmentCards";
import ChartsSection from "./components/ChartsSection";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#121212", color: "white" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <DashboardAppBar />

        {/* Content should not be hidden under the fixed AppBar */}
        <Box sx={{ p: 4, pt: 10 }}> {/* Added `pt:10` to push content below navbar */}
          <Typography variant="h5" sx={{  mb: 0.5 }}>
            Good morning, Yashna!
          </Typography>
          <Typography variant="body1" sx={{ color: "#A0AEC0" }}>
            Evaluate Your Investment Performance
          </Typography>

          {/* Investment Cards */}
          <InvestmentCards />

          {/* Charts Section with Tabs */}
          <ChartsSection />

        </Box>
      </Box>
    </Box>
  );
}

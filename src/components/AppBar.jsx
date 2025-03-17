import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Search, Notifications, People, Folder } from "@mui/icons-material";
import logo from "../assets/logoKazhana.png"; // Import the logo

export default function DashboardAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#1B1A1A", // Navbar background color
        boxShadow: "none",
        borderBottom: "1px solid #2D3748",
        width: "100%",
        left: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure navbar is above sidebar
      }}
    >
      <Toolbar>
        {/* Logo on the left */}
        <Box sx={{ pl: 2, display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: "40px" }} /> {/* Logo */}
        </Box>

        {/* Centered Navigation Links */}
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          {["Home", "Portfolio", "Mutual Funds", "Tools", "Transactions"].map((text, index) => (
            <Box
              key={text}
              sx={{
                mx: 3,
                cursor: "pointer",
                color: index === 1 ? "white" : "#A0AEC0", // Highlight "Portfolio"
                borderBottom: index === 1 ? "2px solid #1E90FF" : "none",
                paddingBottom: "5px",
              }}
            >
              {text}
            </Box>
          ))}
        </Box>

        {/* Right Icons */}
        <Box>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <People />
          </IconButton>
          <IconButton color="inherit">
            <Folder />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Search, Notifications, People, Folder } from "@mui/icons-material";

export default function DashboardAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#121212",
        boxShadow: "none",
        borderBottom: "1px solid #2D3748",
        width: "100%", // Full width
        left: 0, // Ensure it starts from the left
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it stays above the sidebar
      }}
    >
      <Toolbar>
        {/* Logo on the left */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1E90FF", pl: 2 }}>
          d
        </Typography>

        {/* Centered Navigation Links */}
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          {["Home", "Portfolio", "Mutual Funds", "Tools", "Transactions"].map((text, index) => (
            <Typography
              key={text}
              variant="body1"
              sx={{
                mx: 3,
                cursor: "pointer",
                color: index === 1 ? "white" : "#A0AEC0", // Highlight "Portfolio"
                borderBottom: index === 1 ? "2px solid #1E90FF" : "none",
                paddingBottom: "5px",
              }}
            >
              {text}
            </Typography>
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

import { Drawer, Box, Paper, List, ListItem, Typography } from "@mui/material";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 120,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 120,
          boxSizing: "border-box",
          backgroundColor: "#1A1A1A",
          color: "white",
          borderRight: "1px solid #2D3748",
        },
      }}
    >
      <Box sx={{ p: 2, mt: 8 }}> {/* Added margin to avoid overlapping AppBar */}
        <List>
          <ListItem
            sx={{
              bgcolor: "#666",
              color: "white",
              textAlign: "center",
              borderRadius: "5px",
              mb: 1,
            }}
          >
            <Typography variant="caption">PHA</Typography>
          </ListItem>

          {["Fund Analysis", "Holdings", "Transactions"].map((text) => (
            <ListItem key={text} sx={{ color: "#A0AEC0", textAlign: "center" }}>
              <Typography variant="caption">{text}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

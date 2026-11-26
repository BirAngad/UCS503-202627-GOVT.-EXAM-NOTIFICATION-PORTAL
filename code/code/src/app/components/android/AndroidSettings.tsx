import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  Typography,
  Paper,
  Avatar,
  Box,
  ListItemButton,
} from "@mui/material";
import {
  Person,
  Notifications,
  Palette,
  Language,
  Security,
  Info,
  HelpOutline,
  Logout,
  ChevronRight,
} from "@mui/icons-material";

export function AndroidSettings() {
  return (
    <Box>
      {/* User Profile Card */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "#1976d2" }}>
            <Person sx={{ fontSize: 36 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Guest User
            </Typography>
            <Typography variant="body2" color="text.secondary">
              guest@govexam.app
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Notifications Settings */}
      <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 600 }}>
          Notifications
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Push Notifications"
              secondary="Get alerts for new exams"
            />
            <Switch defaultChecked />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Deadline Reminders"
              secondary="Alerts 3 days before deadline"
            />
            <Switch defaultChecked />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive exam updates via email"
            />
            <Switch />
          </ListItem>
        </List>
      </Paper>

      {/* Preferences */}
      <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 600 }}>
          Preferences
        </Typography>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText
              primary="Theme"
              secondary="Light"
            />
            <ChevronRight />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary="Language"
              secondary="English"
            />
            <ChevronRight />
          </ListItemButton>
        </List>
      </Paper>

      {/* About & Support */}
      <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 600 }}>
          About & Support
        </Typography>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
            <ChevronRight />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
            <ChevronRight />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" secondary="Version 1.0.0" />
            <ChevronRight />
          </ListItemButton>
        </List>
      </Paper>

      {/* Logout Button */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <ListItemButton sx={{ py: 2 }}>
          <ListItemIcon>
            <Logout sx={{ color: "#d32f2f" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "#d32f2f" }} />
        </ListItemButton>
      </Paper>
    </Box>
  );
}

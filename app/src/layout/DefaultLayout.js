import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const drawerWidth = 240;
const navItems = ["Home", "Customers", "logout"];

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <CssBaseline />
      <Typography variant="h6" sx={{ my: 2 }}>
        Stag Investments
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            component={Link}
            to={`/app/${item}`}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const dispatch = useDispatch();
  return (
    <Box sx={{ display: "flex", backgroundColor: "#1E1E1E" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#1E1E1E" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            <MyTitle>
              <div>
                <img src="/logo.svg" />
              </div>
              <div>Stag Investments</div>
            </MyTitle>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <>
                {item === "logout" ? (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mr: 1 }}
                    onClick={() => dispatch(logout())}
                  >
                    {item}
                  </Button>
                ) : (
                  <>
                    <Button
                      key={item}
                      sx={{ color: "#fff", mr: 1 }}
                      component={Link}
                      to={`/app/${item}`}
                    >
                      {item}
                    </Button>
                  </>
                )}
              </>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 0,
          minHeight: "100%",
          width: "100%",
          backgroundColor: "#1E1E1E",
        }}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

const MyTitle = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  column-gap: 0.6rem;
  font-family: "Metropolis";
`;

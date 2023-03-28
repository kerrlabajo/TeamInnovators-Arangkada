import { Badge, Box, IconButton, Toolbar } from "@mui/material";
import { AppBar } from "../styles/TopbarStyles";
import Logo from '../images/logo.svg';
import { Menu, Notifications } from "@mui/icons-material";


type TopbarProps = {
  open: boolean,
  handleDrawerOpen: () => void,
}

const Topbar = ({ open, handleDrawerOpen }: TopbarProps) => {
  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "primary.dark", alignItem: "center" }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 5, ...(open && { display: 'none' }), }}>
          <Menu />
        </IconButton>
        <Box sx={{ width: "100%" }}>
          <img src={Logo} alt={"arangkada logo"} />
        </Box>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        {/* <IconButton color="inherit">
          <Logout />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
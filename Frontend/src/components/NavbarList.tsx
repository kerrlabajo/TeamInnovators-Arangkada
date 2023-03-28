import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Logout, Person, Dashboard, Payment, Commute, People, Mail, DriveEta } from '@mui/icons-material';
import PaymentIcon from '@mui/icons-material/Payment';
import { NavbarLink } from './NavbarLink';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../helpers/UserContext';
import { useNavigate } from 'react-router-dom';

type NavbarListProps = {
  open: boolean,
};

const NavbarList = ({ open }: NavbarListProps) => {
  const { user, handleSetUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  
  const operatorList: { text: string, icon: React.ReactNode, link: string, end: boolean }[] = [
    { text: "Dashboard", icon: <Dashboard />, link: "/operator", end: true },
    { text: "Vehicles", icon: <Commute />, link: "/operator/vehicles", end: false },
    { text: "Add Vehicles", icon: <DriveEta />, link: "/operator/add-vehicle", end: false },
    { text: "Drivers", icon: <People />, link: "/operator/drivers", end: false },
    { text: "Rental Applications", icon: <Mail />, link: "/operator/rental-applications", end: false },
    { text: "Transactions", icon: <PaymentIcon />, link: "/operator/transactions", end: false },
  ];

  const driverList: { text: string, icon: React.ReactNode, link: string, end: boolean }[] = [
    { text: "Dashboard", icon: <Dashboard />, link: "/driver", end: true },
    { text: "Vehicle Rentals", icon: <Commute />, link: "/driver/vehicle-rentals", end: false },
    { text: "Rental", icon: <DriveEta />, link: "/driver/rental", end: false },
    { text: "Payments", icon: <Payment />, link: "/driver/payments", end: false }
  ];

  const handleLogout = () => {
    handleSetUser(null);
    navigate("/", { replace: true });
  }

  return (
    <>
      {/* Main List */}
      <List>
        {(user?.type === "Driver" ? driverList : operatorList).map((listItem, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }} >
            <NavbarLink to={listItem.link} text={listItem.text} icon={listItem.icon} open={open} end={listItem.end} />
          </ListItem>
        ))}
      </List>
      <Divider />

      {/* Secondary List */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavbarLink to={user?.type === "Driver" ? "/driver/driverprofile" : "/operator/operator-profile"} text="Account" icon={<Person />} open={open} end={false} />
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={handleLogout}
            sx={{
              color: "primary.contrastText",
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center', px: 2.5,
              "&.Mui-selected": { backgroundColor: "primary.dark" },
              "&.Mui-selected:hover": { backgroundColor: "primary.dark" },
            }}>
            <ListItemIcon sx={{ color: "primary.contrastText", minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0 }} primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default NavbarList;
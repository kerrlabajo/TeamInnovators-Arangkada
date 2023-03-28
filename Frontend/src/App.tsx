import './styles/SupportStyles.css';
import "@fontsource/inter"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import DriverMainLayout from './layouts/DriverMainLayout';
import ModalProvider from 'mui-modal-provider';
import { Navigate, Route, Routes } from 'react-router-dom';
import DriverDashboard from './pages/faith/DriverDashboard';
import VehicleRentals from './pages/faith/VehicleRentals';
import Rental from './pages/faith/Rental';
import RentVehicle from './pages/faith/RentVehicle';
import OperatorMainLayout from './layouts/OperatorMainLayout';
import OperatorDashboard from './pages/kerr/OperatorDashboard';
import ProfilePageOp from './pages/cara/ProfilePageOp';
import EditProfilePageOp from './pages/cara/EditProfilePageOp';
import EditBusinessInfoPage from './pages/cara/EditBusinessInfoPage';
import DeleteAccPage from './pages/cara/DeleteAccPage';
import RegistrationOneOp from './pages/cara/RegistrationOneOp';
import RegistrationTwoOp from './pages/cara/RegistrationTwoOp';
import ContactUsPage from './pages/cara/ContactUsPage';
import AboutUsPageD from './pages/karylle/AboutUsPageD';
import Payments from './pages/kerr/Payments';
import PayRent from './pages/kerr/PayRent';
import MyVehicles from './pages/mariel/MyVehicles';
import AddVehiclePage from './pages/mariel/AddVehiclePage';
import UpdateVehiclePage from './pages/mariel/UpdateVehiclePage';
import DeleteVehiclePage from './pages/mariel/DeleteVehiclePage';
import ViewVehiclePage from './pages/mariel/ViewVehiclePage';
import CancelRental from './pages/faith/CancelRental';
import SnackbarContextProvider from './helpers/SnackbarContext';
import Snackbar from './components/Snackbar';
import RentalApplications from './pages/faith/RentalApplications';
import Drivers from './pages/faith/Drivers';
import DischargeDriver from './pages/faith/DischargeDriver';
import { UserContext, UserContextType } from './helpers/UserContext';
import { DriverRoute, OperatorRoute, PublicRoute } from './routes/routes';
import { useContext, useEffect } from 'react';
import UpdatePayment from './pages/kerr/UpdatePayment';
import LoginPage from './pages/karylle/LoginPage';
import MainProfileD from './pages/karylle/MainProfileD';
import EditAccPageD from './pages/karylle/EditAccPageD';
import EditLicensePage from './pages/karylle/EditLicensePage';
import DeleteAccPageD from './pages/karylle/DeleteAccPageD';
import RegisterDriver1 from './pages/karylle/RegisterDriver1';
import Transactions from './pages/kerr/Transactions';
import CollectPayment from './pages/kerr/CollectPayment';

/* Customize default mui theme */
const theme = createTheme({
  palette: {
    primary: {
      main: "#D2A857",
      contrastText: '#fff',
    },
    secondary: {
      main: "#99AEC1",
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'inter',
      'sans-serif',
    ].join(','),
  },
});
/* Customize default mui theme */

const App = () => {
  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    window.localStorage.setItem("ARANGKADA_USER", JSON.stringify(user));
  }, [user])

  return (
    <ThemeProvider theme={theme}>

      <ModalProvider>
        <SnackbarContextProvider>
        <Routes>
            {/* Driver Pages */}
            <Route path="driver" element={<DriverRoute><DriverMainLayout /></DriverRoute>}>
              <Route index element={<DriverDashboard />} />
              <Route path="vehicle-rentals">
                <Route index element={<VehicleRentals />} />
                <Route path=":id" element={<RentVehicle />} />
              </Route>
              <Route path="rental">
                <Route index element={<Rental />} />
                <Route path="cancel" element={<CancelRental />} />
              </Route>
              <Route path="payments">
                <Route index element={<Payments />} />
                <Route path="pay-rent" element={<PayRent />} />
                <Route path="update/:id" element={<UpdatePayment />}/>
              </Route>
              <Route path="driverprofile">
              <Route index element={<MainProfileD/>} />
              <Route path="edit-driver-prof/:id" element={<EditAccPageD/>} />
              <Route path="edit-license-info/:id" element={<EditLicensePage/>} />
              <Route path="delete-dr/:id" element={<DeleteAccPageD/>} />
            </Route>

            </Route>

        {/* Operator Pages */}
        <Route path="operator" element={<OperatorRoute><OperatorMainLayout /></OperatorRoute>}>
          <Route index element={<OperatorDashboard/>} />
          <Route path="vehicles">
            <Route index element={<MyVehicles />} />
            <Route path="update/:id" element={<UpdateVehiclePage />} />
            <Route path="delete/:id" element={<DeleteVehiclePage />} />
            <Route path="view/:id" element={<ViewVehiclePage />} />
          </Route>
          <Route path="add-vehicle" element={<AddVehiclePage />} />
          <Route path="drivers">
            <Route index element={<Drivers />} />
            <Route path="discharge/:id" element={<DischargeDriver />} />
          </Route>
          <Route path="rental-applications" element={<RentalApplications />} />
          <Route path="transactions">
            <Route index element={<Transactions />} />
            <Route path="collect/:id" element={<CollectPayment />}/>
          </Route>
          <Route path="operator-profile">
            <Route index element={<ProfilePageOp/>} />
            <Route path="edit-operator-prof/:id" element={<EditProfilePageOp/>} />
            <Route path="edit-business-info/:id" element={<EditBusinessInfoPage/>} />
            <Route path="delete-op/:id" element={<DeleteAccPage/>} />
          </Route>
        </Route>

        {/* Public pages */}
        <Route path="registration">
          <Route index element={<PublicRoute><RegistrationOneOp /></PublicRoute>} />
          <Route path="register-operator" element={<PublicRoute><RegistrationTwoOp /></PublicRoute>} />
          <Route path="registerdriver" element={<PublicRoute><RegisterDriver1 /></PublicRoute>} />
        </Route>

        <Route path="about-us" element={<PublicRoute><AboutUsPageD /></PublicRoute>} />
        <Route path="contact-us" element={<PublicRoute><ContactUsPage /></PublicRoute>} />
        <Route path="" element={<PublicRoute><LoginPage /></PublicRoute>} />

        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
      <Snackbar />
    </SnackbarContextProvider>
    </ModalProvider>
    </ThemeProvider>
  );
}

export default App;

import { Button, Card, CardContent, Divider, Typography, Stack, CardActions, CardHeader } from "@mui/material";
import { Person, Phone } from "@mui/icons-material/";
import { Rental, Vehicle } from "../../api/dataTypes";
import RentalService from "../../api/RentalService";
import { useModal } from "mui-modal-provider";
import { NoticeModal } from "../Modals";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../helpers/UserContext";

type VehicleCardProps = {
  vehicle: Vehicle,
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { showModal } = useModal();
  const navigate = useNavigate();

  const handleRentVehicle = () => {
    if (user !== null) {
      RentalService.getCurrentRentalByDriver(
        user.userId
      ).then((response) => {
        const currentRental: Rental = response.data;
        if (currentRental) {
          const modal = showModal(NoticeModal, {
            title: "You have an ogoing or pending rental.",
            content: "You can only have one rental at a time. Finish or cancel your ongoing or pending rental first.",
            onOkay: () => {
              modal.hide();
            }
          });
        } else {
          navigate("/driver/vehicle-rentals/" + vehicle.vehicleId);
        }
      })
    }
  }

  return (
    <Card>
      <CardHeader
        title={vehicle.operator.businessName}
        subheader={
          <Stack spacing={1} direction="row" mt={1} justifyContent="space-between" alignItems="end">
            <Stack spacing={{ xs: 1, sm: 2 }} direction={{ xs: "column", sm: "row" }}>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Person sx={{ color: "text.secondary" }} />
                <Typography variant="body1">{vehicle.operator.account.firstname + " " + vehicle.operator.account.lastname}</Typography>
              </Stack>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Phone sx={{ color: "text.secondary" }} />
                <Typography variant="body1">{vehicle.operator.account.contactNumber}</Typography>
              </Stack>
            </Stack>
            <Typography variant="body2" color="text.secondary"><b>VEHICLE ID: {vehicle.vehicleId}</b></Typography>
          </Stack>
        }
      />
      <Divider />

      {/* Vehicle Information */}
      <CardContent>
        <Typography variant="body1">Plate Number: <b>{vehicle.plateNumber}</b></Typography>
        <Typography variant="body1">Vehicle Type: <b>{vehicle.vehicleType}</b></Typography>
        <Typography variant="body1">Vehicle Make: <b>{vehicle.makeModel}</b></Typography>
        <Typography variant="body1">Route: <b>{vehicle.route}</b></Typography>
      </CardContent>

      <CardActions >
        <Stack direction={{ xs: "column", md: "row" }} padding={1} alignItems="center" spacing={4} width="100%">
          {/* Vehicle Rental Fee */}
          <Stack width="100%">
            <Typography variant="h6"><strong>PHP {vehicle.rentalFee}</strong></Typography>
            <Typography variant="body2">per rent</Typography>
          </Stack>
          <Stack direction={{ xs: "column-reverse", md: "row" }} width="100%" justifyContent="end" >
            <Button size="small" variant="contained" sx={{ width: "150px" }} onClick={handleRentVehicle}>Rent Vehicle</Button>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default VehicleCard;
import { Typography, Stack } from "@mui/material";
import { Vehicle } from "../../api/dataTypes";
import { Person, Phone } from "@mui/icons-material/";

type VehicleDetailsProps = {
  vehicle: Vehicle,
}

const VehicleDetails = ({ vehicle }: VehicleDetailsProps) => {

  return (
    <div>
      <Typography variant="h5">{vehicle.operator.businessName}</Typography>

      {/* Operator Information */}
      <Stack spacing={1} direction="column" mt={1}>
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
      </Stack>
      <br></br>

      {/* Vehicle Information */}
      <Typography variant="body1">Vehicle ID: <b>{vehicle.vehicleId}</b></Typography>
      <Typography variant="body1">Plate Number: <b>{vehicle.plateNumber}</b></Typography>
      <Typography variant="body1">Vehicle Type: <b>{vehicle.vehicleType}</b></Typography>
      <Typography variant="body1">Vehicle Make: <b>{vehicle.makeModel}</b></Typography>
      <Typography variant="body1">Route: <b>{vehicle.route}</b></Typography>
      <br></br>

      {/* Vehicle Rental Fee */}
      <Typography variant="h6"><strong>PHP {vehicle.rentalFee}</strong><Typography variant="body2">per day</Typography></Typography>
    </div>
  );
}

export default VehicleDetails;
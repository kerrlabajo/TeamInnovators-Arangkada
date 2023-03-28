import { Divider, Typography } from "@mui/material";
import { Rental } from "../../api/dataTypes";

type RentalDetailsProps = {
    rental: Rental,
  }

  const RentalDetails = ({ rental }: RentalDetailsProps) => {
    const duration = (new Date(rental.endDate).valueOf() - new Date(rental.startDate).valueOf());

    return (
      <div>
        <Typography variant="h5">PHP {rental.vehicle.rentalFee*(duration/86400000)}.00</Typography>
        <Typography variant="body1" color="text.secondary">Plate Number: {rental.vehicle.plateNumber}</Typography>
        <Typography variant="body1" color="text.secondary">Business Name: {rental.vehicle.operator.businessName}</Typography>
        <br></br>
        <Divider/>
        <br></br>
        <Typography variant="body2" color="text.secondary">Operator: {rental.vehicle.operator.account.firstname + " " + rental.vehicle.operator.account.lastname}</Typography>
        <Typography variant="body2" color="text.secondary">Contact Number: {rental.vehicle.operator.account.contactNumber}</Typography>
        <Typography variant="body2">Start Date: <b>{rental.startDate}</b> </Typography>
        <Typography variant="body2">Status: <b>{rental.status}</b> </Typography>
      </div>
    );
  }
  
  export default RentalDetails;
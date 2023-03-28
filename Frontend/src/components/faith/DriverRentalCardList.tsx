import { Grid } from "@mui/material";
import { Rental } from "../../api/dataTypes";
import DriverRentalCard from "./DriverRentalCard";

type DriverRentalCardListProps = {
  rentals: Rental[],
  handleDriverRentalDecline?: (rentalId: number) => void,
  handleDriverRentalApprove?: (rentalId: number) => void,
}

const DriverRentalCardList = ({ rentals, handleDriverRentalApprove, handleDriverRentalDecline }: DriverRentalCardListProps) => {
  return (
    <Grid container spacing={2}>
      {rentals.map((rental) => (
        <Grid xs={12} item key={rental.rentalId}>
          <DriverRentalCard rental={rental} handleDriverRentalApprove={handleDriverRentalApprove} handleDriverRentalDecline={handleDriverRentalDecline} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DriverRentalCardList;
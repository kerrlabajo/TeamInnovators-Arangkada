import { Button, Stack, TextField, Grid } from "@mui/material";
import { useState } from "react";
import { Rental } from "../../api/dataTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import PaymentService from "../../api/PaymentService";
import RentalService from "../../api/RentalService";
import VehicleService from "../../api/VehicleService";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";

type RentalDetailsProps = {
  rental: Rental,
}

const PayRentForm = ({rental}: RentalDetailsProps) => {
    const navigate = useNavigate();
    const duration = (new Date(rental.endDate).valueOf() - new Date(rental.startDate).valueOf());
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    const [data, setData] = useState({
      paymentId: "",
      amount: "",
      datePaid: "",
      rental: "",
      collected: false
    })
  
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if(Number(data.amount) >= rental.vehicle.rentalFee*(duration/86400000))
      {
        PaymentService.postPayment({
          paymentId: -1,
          amount: Number(data.amount),
          datePaid: new Date(new Date().setHours(0, 0, 0, 0)).toJSON(),
          rental: rental,
          collected: false
        }).then((response) => {
          RentalService.putRental(response.data.rental.rentalId.toString(),
          {
            startDate: rental.startDate,
            endDate: rental.endDate,
            status: rental.status,
            current: rental.current,
            paid: true,
          }).then((response) => {
            VehicleService.putVehicleRented(
              response.data.vehicle.vehicleId,
              true
            ).then(() => {})
          }).catch((error) => {
            handleSetMessage(error.message + ". Failed to update previous rental after payment.");
          })
        }).catch((error) => {
          handleSetMessage(error.message);
        })
          handleSetMessage("Successfully paid the rent.")
          navigate('/driver/payments')
      }
      else
      {
        handleSetMessage("Amount is not correct.")
      }
    }

    const handleBack = () => {
      RentalService.putRental(rental.rentalId.toString(),
      {
        startDate: rental.startDate,
        endDate: rental.endDate,
        status: "APPROVED",
        current: true,
        paid: rental.paid,
      }).then((response) => {
        VehicleService.putVehicleRented(
          response.data.vehicle.vehicleId,
          true
        ).then(() => {})
      }).catch((error) => {
        handleSetMessage(error.message + ". Failed to cancel payment.");
      })
      navigate("../", { replace: true });
    }
  
    return ( 
      <>
      <Grid container spacing={2} onSubmit={handleSubmit} component="form" sx={{marginTop: 2, marginBottom: 5}}>
      <Grid item xs={12} md={4}>
         <TextField 
              onChange={handleAmountChange} 
              value={data.amount} 
              name="amount"
              label="Amount" 
              size="small"
              fullWidth 
              required>
          </TextField> 
      </Grid>
          <Grid item xs={12} >
          <Stack spacing={3} direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: "end" }}>
            <Button onClick={handleBack} color="secondary" variant="contained" sx={{ width: "250px" }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ width: "250px"}}>Pay Rent</Button>
          </Stack>
          </Grid>
      </Grid>
      </>
     );
  }
  
  export default PayRentForm;
import { Payment } from "../../api/dataTypes";
import PaymentIcon from '@mui/icons-material/Payment';
import RentIcon from '@mui/icons-material/CarRental';
import { Link } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";

type MyPaymentCardProps = {
    myPayment: Payment,
  }

const PaymentCard = ({ myPayment }: MyPaymentCardProps) => {
    return (
        <>
        <Card>
          <CardHeader 
            title={myPayment.rental.vehicle.plateNumber}
            subheader={
                <>
                  <Stack spacing={0.5} direction="row" alignItems="center">
                    <PaymentIcon /> <Typography variant="body1">PHP {myPayment.amount}.00</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row" alignItems="center">
                    <RentIcon /> <Typography variant="body1">Rental Id: {myPayment.rental.rentalId}</Typography>
                  </Stack>
                </>
                }
          />
          <Divider />
          <CardContent>
              <Typography 
                  variant="body1">Date Paid: <b>{myPayment.datePaid}</b> 
              </Typography>
              <Typography 
                  variant="body1">Business Name: <b>{myPayment.rental.vehicle.operator.businessName}</b> 
              </Typography>
              <Typography 
                  variant="body1">Operator Name: <b>{myPayment.rental.vehicle.operator.account.firstname + ' ' + myPayment.rental.vehicle.operator.account.lastname}</b>
              </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Link to={"/driver/payments/update/"+ myPayment.paymentId } style={{ textDecoration: 'none' }}> 
            <Button
               size="small" 
               variant="contained"
               sx={{width:"150px"}}>
                Edit
              </Button>
              </Link>
          </CardActions>
        </Card>
        </>
      );
}

export default PaymentCard;
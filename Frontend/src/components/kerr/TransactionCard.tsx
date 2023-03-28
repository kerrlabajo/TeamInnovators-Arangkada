import { Payment } from "../../api/dataTypes";
import PaymentIcon from '@mui/icons-material/Payment';
import RentIcon from '@mui/icons-material/CarRental';
import { Link } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";

type TransactionCardProps = {
    transactions: Payment,
  }

const TransactionCard = ({ transactions }: TransactionCardProps) => {
    return (
        <>
        <Card>
          <CardHeader 
            title={transactions.rental.driver.account.firstname + " " + transactions.rental.driver.account.lastname}
            subheader={
                <>
                  <Stack spacing={0.5} direction="row" alignItems="center">
                    <PaymentIcon /> <Typography variant="body1">PHP {transactions.amount}.00</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row" alignItems="center">
                    <RentIcon /> <Typography variant="body1">Rental Id: {transactions.rental.rentalId}</Typography>
                  </Stack>
                </>
                }
          />
          <Divider />
          <CardContent>
              <Typography 
                  variant="body1">Vehicle Rented: <b>{transactions.rental.vehicle.plateNumber}</b> 
              </Typography>
              <Typography 
                  variant="body1">Date Paid: <b>{transactions.datePaid}</b> 
              </Typography>
              <Typography 
                  variant="body1">Contact Number: <b>{transactions.rental.vehicle.operator.account.contactNumber}</b>
              </Typography>
          </CardContent>
          {transactions.collected === false && 
          <CardActions sx={{ justifyContent: "end" }}>
            <Link to={"/operator/transactions/collect/"+ transactions.paymentId } style={{ textDecoration: 'none' }}> 
            <Button
               size="small" 
               variant="contained"
               sx={{width:"150px"}}>
                Collect
              </Button>
              </Link>
          </CardActions>
          }
          {transactions.collected === true && 
          <CardActions sx={{ justifyContent: "end" }}>
            <Button
               size="small"
               disabled 
               color="info"
               variant="contained"
               sx={{width:"225px"}}>
                Already Collected
              </Button>
          </CardActions>
          }
          
        </Card>
        </>
      );
}

export default TransactionCard;
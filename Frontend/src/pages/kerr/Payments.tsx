import { Box, Button, CardActions, Grid, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useModal } from "mui-modal-provider";
import { NoticeModal } from "../../components/Modals";
import { Payment, Rental } from "../../api/dataTypes";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import PaymentService from "../../api/PaymentService";
import RentalService from "../../api/RentalService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";
import PaymentCardList from "../../components/kerr/PaymentCardList";
import { UserContext, UserContextType } from "../../helpers/UserContext";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";

const Payments = () => {
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    const { user } = useContext(UserContext) as UserContextType;
    const { showModal } = useModal();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [currentRental, setCurrentRental] = useState<any>({} as any);
    const [tempoRental] = useState<Rental>({} as Rental);

    const handlePayRentClick = () => {
      if(currentRental === null){
        const modal = showModal(NoticeModal, {
          title: "You are not currently renting any vehicles.",
          content: "Apply for a vehicle and get approved by the operator first to proceed.",
          onOkay: () => {
            modal.hide();
          }
        });
      }
      else if(currentRental !== null){
        if(currentRental.status === "APPROVED"){
          navigate("/driver/payments/pay-rent/");
        }
        else{
          const modal = showModal(NoticeModal, {
            title: "You are not allowed to pay the rent yet.",
            content: "Wait for the operator to approve your rental application.",
            onOkay: () => {
              modal.hide();
            }
          });
        }
      }
    }

    useEffect(() => {
      if (user !== null) {
        PaymentService.getPaymentsByDriverId(
          user.userId
          ).then((response) => {
          setPayments(response.data);
          setError("");
        }).catch((error) => {
          setError(error.message);
        }).finally(() => {
          setLoading(false);
        })

        RentalService.getCurrentRentalByDriver(
          user.userId
          ).then((response) => {
            if(typeof response.data !== typeof tempoRental)
            {
              setCurrentRental(null);
            }
            else
            {
              setCurrentRental(response.data);
            }
            setError("");
        }).catch((error) => {
          handleSetMessage(error.message);
        }).finally(() => {
          setLoading(false);
        })
      }
    }, []);

    if (loading) return (<Loading />)

    if (error !== "") return (<ResponseError message={error} />)

    return (
      <>
      <Box mt="12px" display="flex" flexDirection="column" sx={{ minHeight: "80vh" }}>
        <PageHeader title="My Payments" />
        <br></br>
        <CardActions sx={{ justifyContent: "end" }}>
              <Button 
                id="AddBtn"
                onClick={handlePayRentClick}
                variant="contained"  
                sx={{height: "65px",width: "65px",borderRadius: "50px"}}>
                <h1>+</h1>
              </Button>
          </CardActions>
          {payments.length !== 0 && <PaymentCardList myPayments={payments} />}
          {payments.length === 0 && <Typography variant="body1" color="text.secondary">No rents paid.</Typography>}
          <Footer name="Kerr Labajo" course="BSCS" section="F1" />
      </Box>
      </>
      );
}
export default Payments;
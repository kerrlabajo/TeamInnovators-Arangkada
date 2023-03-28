import { Box, Button, CardActions, Stack, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Payment } from "../../api/dataTypes";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import PaymentService from "../../api/PaymentService";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";
import TransactionCardList from "../../components/kerr/TransactionCardList";
import { UserContext, UserContextType } from "../../helpers/UserContext";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";

const Transactions = () => {
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const { user } = useContext(UserContext) as UserContextType;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        if (user !== null) {
          PaymentService.getAllPayments(user.userId)
          .then((response) => {
            setPayments(response.data);
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

    const handleCollected = () => {
      (!flag2 ? setFlag2(!flag2) : setFlag2(flag2))
      setFlag1(!flag1);
      if (user !== null) {
        PaymentService.getAllCollectedPayments(user.userId)
        .then((response) => {
          setPayments(response.data);
          setError("");
        }).catch((error) => {
          handleSetMessage(error.message);
        }).finally(() => {
          setLoading(false);
        })
      }
    }

    const handleUncollected = () => {
      (!flag1 ? setFlag1(!flag1) : setFlag1(flag1))
      setFlag2(!flag2);
      if (user !== null) {
        PaymentService.getAllUnCollectedPayments(user.userId)
        .then((response) => {
          setPayments(response.data);
          setError("");
        }).catch((error) => {
          handleSetMessage(error.message);
        }).finally(() => {
          setLoading(false);
        })
      }
    }

    return (
        <>
        <Box mt="12px" display="flex" flexDirection="column" sx={{ minHeight: "80vh" }}>
          <PageHeader title="My Driver's Transactions" />
          <br></br>
          <Stack spacing={0.5} direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: "end" }}>
            <Button
                size="small"
                onClick={handleCollected}
                color={flag1 ? "primary" : "secondary"}
                variant="contained"
                sx={{width:"150px"}}>
                Collected
            </Button>
            <Button
                size="small"
                onClick={handleUncollected}
                color={flag2 ? "primary" : "secondary"}
                variant="contained"
                sx={{width:"150px"}}>
                Uncollected
            </Button>
          </Stack>
            
          {payments.length !== 0 && <TransactionCardList transactions={payments} />}
          {payments.length === 0 && <Typography variant="body1" color="text.secondary">No entries.</Typography>}
          <Footer name="Kerr Labajo" course="BSCS" section="F1" />
        </Box>
        </>
        );
}

export default Transactions;
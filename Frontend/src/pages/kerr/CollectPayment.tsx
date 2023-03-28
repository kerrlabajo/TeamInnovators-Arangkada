import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Payment } from "../../api/dataTypes";
import PaymentService from "../../api/PaymentService";
import Instructions from "../../components/faith/Instructions";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { UserContext, UserContextType } from "../../helpers/UserContext";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";
import CollectPaymentForm from "../../components/kerr/CollectPaymentForm";

const CollectPayment = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const param = useParams() as { id: string };
    const [selectedPayment, setSelectedPayment] = useState<Payment>({} as Payment);

    useEffect(() => {
        if (user !== null) {
          PaymentService.getPaymentById(param.id.toString())
          .then((response) => {
            setSelectedPayment(response.data)
            console.log(response.data);
            setError("");
          }).catch((error) => {
            setError(error.message);
          }).finally(() => {
            setLoading(false);
          })
        }
      }, []);

    if (loading) return (<Loading />)

    if (error !== "") return (<ResponseError message={error} />)

  return (
    <>
      <Box mt="12px" sx={{ minHeight: "80vh" }}>
        <PageHeader title="Collect Payment" />
        <br></br>
        <Typography variant="h5">Payment ID: {selectedPayment.paymentId}</Typography>
        <br></br>
        <Instructions
          header="Do you want to collect this payment?"
          subheader="This action cannot be undone."
        />
        <br></br>
        <br></br>
        <CollectPaymentForm payment={selectedPayment} />
      </Box>
      <Footer name="Kerr Labajo" course="BSCS" section="F1" />
    </>
  );
}

export default CollectPayment;
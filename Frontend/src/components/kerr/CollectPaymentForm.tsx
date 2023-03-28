import { Button, Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PaymentService from "../../api/PaymentService";
import { Payment } from "../../api/dataTypes";
import { useNavigate } from "react-router-dom";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";
import { UserContext, UserContextType } from "../../helpers/UserContext";
import VehicleService from "../../api/VehicleService";

type CollectPaymentProps = {
  payment: Payment,
}

const CollectPaymentForm = ({ payment }: CollectPaymentProps) => {
  const { user } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    PaymentService.putCollected(
        (payment.paymentId).toString(),
        {
            collected: true
        }).then(() => {
            handleSetMessage("Successfully collected the payment.");
            navigate('/operator/transactions');
        }).catch((error) => {
            handleSetMessage(error.message + ". Failed to collect the payment.");
        })
    
  }
  
  const handleBack = () => {
    navigate("../", { replace: true });
  }

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
      <Stack spacing={3} direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: "end" }}>
        <Button onClick={handleBack} color="secondary" variant="contained" sx={{ width: "250px" }}>No, Go Back</Button>
        <Button type="submit" variant="contained" sx={{ width: "250px" }}>Yes, Proceed</Button>
      </Stack>
    </Stack>
  );
}

export default CollectPaymentForm;
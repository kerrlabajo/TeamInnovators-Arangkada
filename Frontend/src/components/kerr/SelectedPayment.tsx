import { Button, FormControl, Grid,  InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState, useContext } from "react";
import PaymentService from "../../api/PaymentService";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";

const UpdateSelectedPayment  = () =>{
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    const navigate = useNavigate();
    const param = useParams() as { id: string };

    const [putPayment, setPutPayment]= useState({
        amount: "",
    })
    const updatePayment = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        PaymentService.putPayment( 
          param.id.toString(),
          {
            amount: Number(putPayment.amount)
           })
          .then((response)=> {
            handleSetMessage("Successfully updated Payment No. " + response.data.paymentId);
            navigate("/driver/payments");

          })
          .catch((error) => {
            handleSetMessage("Failed to update payment." + error.message);
          })
    };

  useEffect(() => {
    PaymentService.getPaymentById(param.id).then((response) => {
      setPutPayment(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);
     
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPutPayment({ ...putPayment, [e.target.name]: e.target.value });
    };

    return ( 
        <>
        <Grid container spacing={4} onSubmit={updatePayment}component="form">
        <Grid item xs={12} md={4}>
           <TextField 
                onChange={handleChange} 
                value={putPayment.amount} 
                name="amount"
                label="Amount" 
                size="small"
                fullWidth 
                required
            >
            </TextField> 
        </Grid>
            <Grid item xs={12} >
            <Stack spacing={3} direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: "end" }}>
              <Button  onClick={() => navigate(-1)} color="secondary" variant="contained" sx={{ width: "250px" }}>Cancel</Button>
              <Button  type="submit" variant="contained" sx={{ width: "250px"}}>Save Changes</Button> 
            </Stack>
            </Grid>
        </Grid>
        </>
       );
    }
export default UpdateSelectedPayment;
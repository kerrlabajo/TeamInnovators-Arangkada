import { Button, Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RentalService from "../../api/RentalService";
import { Rental } from "../../api/dataTypes";
import { useNavigate } from "react-router-dom";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";
import { UserContext, UserContextType } from "../../helpers/UserContext";
import VehicleService from "../../api/VehicleService";

type DischargeDriverFormProps = {
  rental: Rental,
}

const DischargeDriverForm = ({ rental }: DischargeDriverFormProps) => {
  const navigate = useNavigate();
  const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
  const { user } = useContext(UserContext) as UserContextType;
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError(null);

    if (password === "") {
      setPasswordError("Please enter your password to confirm discharge.")
    } else if (password !== user?.password) {
      setPasswordError("Password is incorrect.")
    } else {
      RentalService.putRental(
        rental.rentalId.toString(),
        {
          startDate: rental.startDate,
          endDate: rental.endDate,
          status: "CANCELLED",
          current: false,
          paid: rental.paid,
        }).then((response) => {
          VehicleService.putVehicleRented(
            response.data.vehicle.vehicleId,
            false
          ).then(() => {
            handleSetMessage("Driver discharged.");
            navigate("../", { replace: true });
          }).catch((error) => {
            handleSetMessage(error.message + ". Failed to discharge driver.");
          })
        }).catch((error) => {
          handleSetMessage(error.message + ". Failed to discharge driver.");
        })
    }
  }

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  }

  const handleBack = () => {
    navigate("../", { replace: true });
  }

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit}>
      <TextField
        onChange={(event) => setPassword(event.target.value)}
        type={showPassword ? "text" : "password"}
        value={password}
        label="Password"
        size="small"
        fullWidth
        error={passwordError !== null}
        helperText={passwordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePasswordShow}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Stack spacing={3} direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: "end" }}>
        <Button onClick={handleBack} color="secondary" variant="contained" sx={{ width: "250px" }}>No, Go Back</Button>
        <Button type="submit" variant="contained" sx={{ width: "250px" }}>Yes, Proceed</Button>
      </Stack>
    </Stack>
  );
}

export default DischargeDriverForm;
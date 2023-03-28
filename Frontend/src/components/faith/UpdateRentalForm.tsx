import { Button, Stack, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { useModal } from "mui-modal-provider";
import { ConfirmationModal, NoticeModal } from "../Modals";
import RentalService from "../../api/RentalService";
import { Rental } from "../../api/dataTypes";
import { useNavigate } from "react-router-dom";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";
import VehicleService from "../../api/VehicleService";

type UpdateRentalFormProps = {
  currentRental: Rental,
  handleSetCurrentRental: (rental: Rental) => void,
}

const UpdateRentalForm = ({ currentRental, handleSetCurrentRental }: UpdateRentalFormProps) => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;

  const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
  const [startDate, setStartDate] = useState<Date | null>(new Date(currentRental.startDate));
  const [endDate, setEndDate] = useState<Date | null>(new Date(currentRental.endDate));
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEndDateError(null);
    setStartDateError(null);

    if (startDate === null)
      setStartDateError("Please enter a start date.");
    else if (startDate.toString() === "Invalid Date")
      setStartDateError("Invalid date.")
    else if (startDate < currentDate)
      setStartDateError("Start date must be today or later.")
    else if (endDate === null)
      setEndDateError("Please enter an end date.");
    else if (endDate.toString() === "Invalid Date")
      setEndDateError("Invalid end date.");
    else if (endDate < startDate)
      setEndDateError("End date must not be before the start date.");
    else {
      RentalService.putRental(
        currentRental.rentalId.toString(),
        {
          startDate: startDate.toJSON(),
          endDate: endDate.toJSON(),
          status: currentRental.status,
          current: currentRental.current,
          paid: currentRental.paid,
        }).then((response) => {
          handleSetCurrentRental(response.data);
          handleSetMessage("Rental updated.");
        }).catch((error) => {
          handleSetMessage(error.message + ". Failed to updated rental.");
        })
    }
  }

  const handleCancelRental = () => {
    if(currentRental.paid === true) {
      navigate("/driver/rental/cancel", { state: { rental: currentRental } });
    } else {
      const modal = showModal(NoticeModal, {
        title: "Pay your rental fee first.",
        content: "You can only cancel your rental if you have already settled your payments.",
        onOkay: () => { 
          modal.hide();
        }
      });
    }
  }

  const handleFinishRental = () => {
    if(currentRental.paid === true) {
      RentalService.putRental(
        currentRental.rentalId.toString(),
        {
          startDate: currentRental.startDate,
          endDate: currentRental.endDate,
          status: currentRental.status,
          current: false,
          paid: currentRental.paid,
        }).then((response) => {
          VehicleService.putVehicleRented(
            response.data.vehicle.vehicleId,
            false
          ).then(() => {
            handleSetCurrentRental({} as Rental);
            handleSetMessage("Rental finished.");
          }).catch((error) => {
            handleSetMessage(error.message + ". Failed to finish rental.");
          })
        }).catch((error) => {
          handleSetMessage(error.message + ". Failed to finish rental.");
        })
    } else {
      const modal = showModal(NoticeModal, {
        title: "Pay your rental fee first.",
        content: "You can only finish your rental if you have already settled your payments.",
        onOkay: () => { 
          modal.hide();
        }
      });
    }
  }

  const handleCancel = () => {
    const modal = showModal(ConfirmationModal, {
      title: "Are you sure you want to cancel this application?",
      content: "The operator is yet to respond to your rental application. If you cancel now, the application would be deleted.",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: () => {
        modal.hide();
        RentalService.deleteRental(
          currentRental.rentalId.toString()
        ).then(() => {
          VehicleService.putVehicleRented(
            currentRental.vehicle.vehicleId.toString(),
            false
          ).then(() => {
            handleSetCurrentRental({} as Rental);
            handleSetMessage("Rental application cancelled.");
          }).catch((error) => {
            handleSetMessage(error.message + ". Failed to cancel rental application.");
          })

        }).catch((error) => {
          handleSetMessage(error.message + ". Failed to cancel rental application.");
        })
      }
    });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} component="form" onSubmit={handleSubmit}>
        <DesktopDatePicker
          readOnly={currentRental.status !== "PENDING"}
          label="Start Date"
          minDate={currentDate}
          value={startDate}
          onChange={(date) => setStartDate(date)}
          renderInput={(params) => <TextField {...params} size="small" error={startDateError !== null} helperText={startDateError} />}
        />
        <DesktopDatePicker
          readOnly={currentRental.status !== "PENDING"}
          label="End Date"
          minDate={startDate !== null ? currentDate : new Date()}
          value={endDate}
          onChange={(date) => setEndDate(date)}
          renderInput={(params) => <TextField size="small" {...params} error={endDateError !== null} helperText={endDateError} />}
        />
        <Stack spacing={3} direction={{ xs: "column-reverse", md: "row" }} sx={{ justifyContent: currentRental.status !== "APPROVED" ? "end" : "start" }}>
          {
            currentRental.status === "PENDING" &&
            <>
              <Button onClick={handleCancel} color="secondary" variant="contained" sx={{ width: "250px" }}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ width: "250px" }}>Save Changes</Button>
            </>
          }
          {currentRental.status === "APPROVED" && <Button onClick={handleCancelRental} color="error" variant="contained" sx={{ width: "250px" }}>Cancel Rental</Button>}
          {currentRental.status === "FINISHED" && <Button onClick={handleFinishRental} color="info" variant="contained" sx={{ width: "250px" }}>Finish Rental</Button>}
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}

export default UpdateRentalForm;
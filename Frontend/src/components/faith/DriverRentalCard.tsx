import { Button, Card, CardContent, Divider, Typography, Stack, CardActions, CardHeader, Chip } from "@mui/material";
import { Home, Phone } from "@mui/icons-material/";
import { Rental } from "../../api/dataTypes";
import { useModal } from "mui-modal-provider";
import { ConfirmationModal } from "../Modals";
import Status from "./Status";
import RentalService from "../../api/RentalService";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import VehicleService from "../../api/VehicleService";

type DriverRentalCardProps = {
  rental: Rental,
  handleDriverRentalDecline?: (rentalId: number) => void,
  handleDriverRentalApprove?: (rentalId: number) => void,
}

const DriverRentalCard = ({ rental, handleDriverRentalApprove, handleDriverRentalDecline }: DriverRentalCardProps) => {
  const { showModal } = useModal();
  const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
  const navigate = useNavigate();

  const handleDischarge = () => {
    navigate("/operator/drivers/discharge/" + rental.driver.driverId, { state: { rental: rental } });
  }

  const handleViewPayments = () => {

  }

  const handleDecline = () => {
    const modal = showModal(ConfirmationModal, {
      title: "Decline this rental application?",
      content: "If you decline this application, the driver will be notified of your response.",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: () => {
        modal.hide();
        modal.hide();
        RentalService.putRental(rental.rentalId.toString(), {
          startDate: rental.startDate,
          endDate: rental.endDate,
          status: "DECLINED",
          current: false,
          paid: rental.paid,
        }).then((response) => {
          VehicleService.putVehicleRented(
            response.data.vehicle.vehicleId,
            false
          ).then(() => {
            handleSetMessage("Rental declined.");
            handleDriverRentalDecline!(response.data.rentalId);
          }).catch((error) => {
            handleSetMessage(error.message + ". Failed to cancel rental.");
          })
        }).catch((error) => {
          handleSetMessage(error.message + ". Failed to declined rental.");
        })
      }
    });
  }

  const handleApprove = () => {
    const modal = showModal(ConfirmationModal, {
      title: "Approve this rental application?",
      content: "If you approve this application, the driver will be notified of your response.",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: () => {
        modal.hide();
        RentalService.putRental(rental.rentalId.toString(), {
          startDate: rental.startDate,
          endDate: rental.endDate,
          status: "APPROVED",
          current: rental.current,
          paid: rental.paid,
        }).then((response) => {
          handleSetMessage("Rental approved.");
          handleDriverRentalApprove!(+response.data.rentalId);
        }).catch((error) => {
          handleSetMessage(error.message + ". Failed to approve rental.");
        })
      }
    });
  }

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5">{rental.driver.account.firstname + " " + rental.driver.account.lastname}</Typography>
            {/* {rental.paid === false && <Chip label="not paid" color="secondary" variant="outlined" size="small" sx={{ width: "70px" }} />}
            {rental.paid === true && <Chip label="paid" color="secondary" size="small" sx={{ width: "75px" }} />} */}
          </Stack>
        }
        subheader={
          <Stack spacing={1} direction="row" mt={1} justifyContent="space-between" alignItems="end">
            <Stack spacing={{ xs: 1, sm: 2 }} direction={{ xs: "column", sm: "row" }}>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Home sx={{ color: "text.secondary" }} />
                <Typography variant="body1">{rental.driver.account.address}</Typography>
              </Stack>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Phone sx={{ color: "text.secondary" }} />
                <Typography variant="body1">{rental.driver.account.contactNumber}</Typography>
              </Stack>
            </Stack>
            <Typography variant="body2" color="text.secondary"><b>DRIVER ID: {rental.driver.driverId}</b></Typography>
          </Stack>
        }
      />
      <Divider />

      {/* License Information */}
      <CardContent>
        <Typography variant="body1">License Number: <b>{rental.driver.licenseNumber}</b></Typography>
        <Typography variant="body1">License Code:   <b>{rental.driver.licenseCode}</b></Typography>
      </CardContent>

      {/* Rental Information */}
      <CardContent>
        <Typography variant="body1">Start Date:  <b>{rental.startDate}</b></Typography>
        <Typography variant="body1">End Date:   <b>{rental.endDate}</b></Typography>
        <Typography variant="body1">Vehicle ID:   <b>{rental.vehicle.vehicleId}</b></Typography>
      </CardContent>

      <CardActions >
        <Stack direction={{ xs: "column", lg: "row" }} padding={1} alignItems="center" spacing={4} width="100%">
          {
            rental.status === "PENDING" ?
              <>
                <Status status="Pending" message="Driver is waiting for your response." />
                <Stack direction={{ xs: "column-reverse", md: "row" }} width="100%" spacing={{ xs: 2, md: 3 }} justifyContent="end" >
                  <Button size="small" variant="contained" color="error" sx={{ width: "150px" }} onClick={handleDecline}>Decline</Button>
                  <Button size="small" variant="contained" color="success" sx={{ width: "150px" }} onClick={handleApprove}>Approve</Button>
                </Stack>
              </> :
              <>
                {rental.status === "APPROVED" && <Status status="Approved" message="Driver is currently renting your vehicle." />}
                {rental.status === "FINISHED" && <Status status="Finished" message="Driver is done with his rental." />}
                <Stack direction={{ xs: "column-reverse", md: "row" }} width="100%" spacing={{ xs: 2, md: 3 }} justifyContent="end" >
                  {rental.status === "APPROVED" && <Button size="small" variant="contained" color="error" sx={{ width: "150px" }} onClick={handleDischarge}>Discharge</Button>}
                </Stack>
              </>
          }
        </Stack>
      </CardActions>
    </Card>
  );
}

export default DriverRentalCard;
import { Box, Grid, Paper, Typography } from "@mui/material";
import DashboardCard from "../../components/faith/DashboardCard";
import PageHeader from "../../components/PageHeader";
import { useContext, useEffect, useState } from "react";
import { DriveEta, Cancel, TaskAlt, CheckCircle } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import RentalService from "../../api/RentalService";
import { Rental } from "../../api/dataTypes";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";
import { UserContext, UserContextType } from "../../helpers/UserContext";

const DriverDashboard = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pageSize, setPageSize] = useState<number>(5);
  const [rentals, setRentals] = useState<Rental[]>([]);

  const columns: GridColDef[] = [
    { field: "rentalId", headerName: "Rental ID", flex: 1, minWidth: 100 },
    { field: "businessName", headerName: "Business Name", flex: 1, minWidth: 100, valueGetter: (param) => param.row.vehicle.operator.businessName },
    { field: "operator", headerName: "Operator", flex: 1, minWidth: 100, valueGetter: (param) => param.row.vehicle.operator.account.firstname + ' ' + param.row.vehicle.operator.account.lastname },
    { field: "vehicleId", headerName: "Vehicle ID", flex: 1, minWidth: 100, valueGetter: (param) => param.row.vehicle.vehicleId },
    { field: "rentalFee", headerName: "Rental Fee (Php)", flex: 1, minWidth: 100, valueGetter: (param) => param.row.vehicle.rentalFee },
    { field: "startDate", headerName: "Start Date", type: "date", flex: 1, minWidth: 100 },
    { field: "endDate", headerName: "End Date", type: "date", flex: 1, minWidth: 100 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
  ]

  useEffect(() => {
    if (user !== null) {
      RentalService.getRentalsByDriver(
        user.userId
      ).then((response) => {
        setRentals(response.data);
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
      <Box mt="12px" display="flex" flexDirection="column" sx={{ minHeight: "80vh" }}>
        <PageHeader title={"Welcome, " + user?.firstname + "!"} />
        <br></br>
        {/* Approved Rental Counts */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard title="Approved Rentals" count={rentals.filter((rental) => rental.status !== "PENDING" && rental.status !== "DECLINED" && rental.status !== "EXPIRED").length}>
              <CheckCircle fontSize="large" color="success" />
            </DashboardCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard title="Ongoing Rental" count={rentals.filter((rental) => rental.current === true).length}>
              <DriveEta fontSize="large" color="primary" />
            </DashboardCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard title="Cancelled Rental" count={rentals.filter((rental) => rental.status === "CANCELLED").length}>
              <Cancel fontSize="large" color="error" />
            </DashboardCard>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard title="Finished Rental" count={rentals.filter((rental) => rental.status === "FINISHED" && rental.current === false).length}>
              <TaskAlt fontSize="large" color="info" />
            </DashboardCard>
          </Grid>
        </Grid>
        <br></br>

        {/* All Rental Applications */}
        <Paper sx={{ padding: "12px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h5">All Rental Applications</Typography>
          <div style={{ flex: 1, width: "100%", minHeight: "380px" }}>
            <DataGrid
              autoHeight
              sx={{ minHeight: "369px", '.MuiDataGrid-columnSeparator': { display: 'none' }, '&.MuiDataGrid-root': { border: 'none' } }}
              rows={rentals}
              columns={columns}
              getRowId={(row) => row.rentalId}
              rowsPerPageOptions={[5, 10, 15]}
              pagination
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pageSize={pageSize}
            />
          </div>:
        </Paper>
      </Box>
      <Footer name="Faith Rosalijos" course="BSIT" section="G1" />
    </>
  );
}

export default DriverDashboard;
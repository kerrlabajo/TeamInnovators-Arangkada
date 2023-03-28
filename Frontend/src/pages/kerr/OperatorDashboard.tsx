import { Box, Grid, Paper, Typography } from "@mui/material";
import DashboardCard from "../../components/faith/DashboardCard";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { CarRental, Commute } from "@mui/icons-material";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import RentalService from "../../api/RentalService";
import { Rental } from "../../api/dataTypes";
import Loading from "../../components/Loading";
import ResponseError from "../../components/faith/ResponseError";
import { UserContext, UserContextType } from "../../helpers/UserContext";

const OperatorDashboard = () => {
    const { user } = useContext(UserContext) as UserContextType;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pageSize, setPageSize] = useState<number>(5);
    const [rentals, setRentals] = useState<Rental[]>([]);
  
    const columns: GridColDef[] = [
      { field: "rentalId", headerName: "Rental ID", flex: 1, minWidth: 100 },
      { field: "driver", headerName: "Driver", flex: 1, minWidth: 100, valueGetter: (param) => param.row.driver.account.firstname + ' ' + param.row.driver.account.lastname },
      { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
      { field: "vehicle", headerName: "Plate Number", flex: 1, minWidth: 100, valueGetter: (param) => param.row.vehicle.plateNumber },
      { field: "startDate", headerName: "Start Date", type: "date", flex: 1, minWidth: 100 },
      { field: "endDate", headerName: "End Date", type: "date", flex: 1, minWidth: 100 },
      { field: "contactNumber", headerName: "Contact Number", flex: 1, minWidth: 100, valueGetter: (param) => param.row.driver.account.contactNumber }
    ]
  
    useEffect(() => {
      if(user !== null) {
        RentalService.getRentalsByOperatorAndStatus(
          user.userId, 
          "APPROVED"
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
        <Box mt="12px" sx={{ minHeight: "80vh" }}>
          <PageHeader title={"Welcome, " + user?.firstname + "!"} />
          <br></br>
          <Grid container spacing={2} alignItems="center" justifyContent="center" >
            <Grid item xs={12} md={6} lg={3}>
              <DashboardCard title="Vehicles Rented" count={rentals.filter((rental) => rental.vehicle.rented === true).length}>
                <Commute fontSize="large" color="secondary" />
              </DashboardCard>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DashboardCard title="Drivers Renting" count={rentals.filter((rental) => rental.status === "APPROVED").length}>
                <CarRental fontSize="large" color="info" />
              </DashboardCard>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DashboardCard title="Paid Drivers" count={rentals.filter((rental) => rental.paid === true).length}>
                <PriceCheckIcon fontSize="large" color="success" />
              </DashboardCard>
            </Grid>
          </Grid>
          <br></br>
          <Paper sx={{ padding: "12px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5">All Drivers Renting</Typography>
            <div style={{ flexGrow: 1, width: "100%", minHeight: "380px" }}>
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
            </div>
          </Paper>
        </Box>
        <Footer name="Kerr Labajo" course="BSCS" section="F1" />
      </>
    );
  }
  
export default OperatorDashboard;
import { Grid } from "@mui/material";
import { Payment } from "../../api/dataTypes";
import TransactionCard from "./TransactionCard";

type TransactionCardListProps = {
    transactions: Payment[],
  }

  const TransactionCardList = ({ transactions }: TransactionCardListProps) => {
    return ( 
      <Grid container spacing={2} sx={{ padding: "12px 0" }}>
        {transactions.map((transactions) => (
          <Grid xs={12} md={12} lg={12} item key={transactions.paymentId}>
            <TransactionCard transactions={transactions} />
          </Grid>
        ))}
        
      </Grid>
      
     );
  }

export default TransactionCardList;
import { Box, Toolbar, Typography } from "@mui/material";
import RegisterOperator from "../../components/cara/RegisterOperator";
import Footer from "../../components/Footer";
import UserAppbar from "../../components/UserAppbar";

export default function RegistrationOne() {
    return (
        <div>
            <UserAppbar></UserAppbar>
            <div className="App">
                <div className="bstyle">
                    <Box component="main" sx={{ p: 6 }}>
                        <Toolbar />
                        <Typography>
                            <RegisterOperator></RegisterOperator>
                        </Typography>
                    </Box>
                    <Footer name="Cara Carmel Encabo" course="BSIT" section="G2"/>
                </div>
            </div>
        </div>
    )
}
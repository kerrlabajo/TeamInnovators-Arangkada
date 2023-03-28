import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, TextField, Stack, Paper, InputAdornment, IconButton } from "@mui/material"
import axios from "axios";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import AccountService from "../../api/AccountService";
import OperatorService from "../../api/OperatorService";
import DriverService from "../../api/DriverService";
import { SnackbarContext, SnackbarContextType } from "../../helpers/SnackbarContext";
import { UserContext, UserContextType } from "../../helpers/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { user, handleSetUser } = useContext(UserContext) as UserContextType;
    const { handleSetMessage } = useContext(SnackbarContext) as SnackbarContextType;
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const { username, password } = loginData;

    const onInputChange = (e: any) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    const checkInfo = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setUsernameError(null);
        setPasswordError(null);

        AccountService.getAccountByUsername(username).then((account) => {
            if(account.data !== "") { // Check if username exist
                console.log(account.data)
                if(account.data.password === password) { // Check if password is correct
                    if(account.data.accountType === "Operator") { // Check user type
                        // Operator
                        OperatorService.getByAccountId(account.data.accountId).then((operator) => {
                            if(operator.data.length !== 0) { // Check if operator exist
                                handleSetUser({
                                    userId: operator.data[0].operatorId,
                                    type: account.data.accountType,
                                    username: account.data.username,
                                    password: account.data.password,
                                    firstname: account.data.firstname,
                                    lastname: account.data.lastname,
                                    accountId: account.data.accountId,
                                });
                                navigate('/operator', { replace: true });
                            }else { setUsernameError("Invalid user.") }
                        }).catch((error) => handleSetMessage(error.message + ". Failed to login."))
                    }else if(account.data.accountType === "Driver") {
                        // Driver
                        DriverService.getByAccountId(account.data.accountId).then((driver) => {
                            if(driver.data.length !== 0) { // Check if driver exist
                                handleSetUser({
                                    userId: driver.data[0].driverId,
                                    type: account.data.accountType,
                                    username: account.data.username,
                                    password: account.data.password,
                                    firstname: account.data.firstname,
                                    lastname: account.data.lastname,
                                    accountId: account.data.accountId,
                                });
                                navigate('/driver', { replace: true });
                            }else { setUsernameError("Invalid user.") }
                        }).catch((error) => handleSetMessage(error.message + ". Failed to login."))
                    }else { setUsernameError("Invalid user.") }
                } else { setPasswordError("Password is incorrect.") }
            } else { setUsernameError("Username does not exists.") }
        })

        // try {
        //     const result = await axios.get(`http://localhost:8080/account/getByUsername?username=${username}`);

        //     if (result.data.accountType === 'Operator' && (result.data) != null) {
        //         if ((result.data.password) === password && (result.data.username) === username) {
        //             // user.handleSetAccount(result.data);
        //             navigate('/operator', { replace: true });
        //         } else {
        //             setPasswordError("Password is incorrect.");
        //         }
        //     } else if (result.data.accountType === 'Driver' && (result.data) != null) {
        //         console.log(result.data)
        //         console.log(password)
        //         console.log(username)
        //         if ((result.data.password) === password && (result.data.username) === username) {
        //             // user.handleSetAccount(result.data);
        //             navigate('/driver', { replace: true });
        //         } else {
        //             setPasswordError("Password is incorrect.");
        //         }
        //     } else {
        //         setUsernameError("Username does not exists.")
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    }

    return (
        <Stack width="100%" alignItems="center" spacing={2}>
            <Paper sx={{ width: "70%", borderRadius: "20px", height: "450px" }}>
                <Stack onSubmit={checkInfo} component="form" padding="64px 74px" spacing={4}>
                    <h1 style={{ color: "#646464", margin: 0 }}>Log in</h1>
                    <TextField
                        size="small"
                        required name="username"
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => onInputChange(e)}
                        error={usernameError !== null}
                        helperText={usernameError}
                    />
                    <TextField
                        required
                        name="password"
                        onChange={(e) => onInputChange(e)}
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
                    <p style={{ color: 'brown', fontSize: '15px', textAlign: 'center' }}>  <a href="https://www.youtube.com" className="links">Forgot password?</a></p>
                    <Stack alignItems="center">
                        <Button variant="contained" type="submit" sx={{ borderRadius: "20px", width: "200px" }}>Log in</Button>
                    </Stack>
                </Stack>
            </Paper>
            <p style={{ color: 'white', fontSize: '16px' }}>Not registered yet?  <Link to="/registration" style={{ color: "white" }}>Create an account</Link></p>
        </Stack>
    )
}

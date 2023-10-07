import { useTheme } from '@emotion/react';
import { Button, TextField } from '@mui/material';
import FlexBetween from 'Components/FlexBetween'
import React, { useEffect, useState } from 'react'
import { changePass } from './LoginRegisterChangePass'
import { useLocation, useNavigate } from 'react-router-dom';
const ChangePass = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const values = location.state;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repass, setRepass] = useState("")
    useEffect(() => {
        !values && navigate("/", { state: null });
    });
    // console.log(email,values)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const values = { email: email, page: "changepass" };
        navigate("/verifyemail", { state: values });
    }
    const handleFormSubmitChangePass = async (e) => {
        e.preventDefault();
        if (password === repass) {
            // console.log(values.email,password)
            changePass({ email:values.email, password })
            navigate("/login");
        } else {
            alert("Plz Enter both Password Similar")
        }
    }
    const { palette } = useTheme();
    return (
        <FlexBetween width="100%" flexDirection={"column"}>
            {
                values?.page === "makenewpass" && <>
                    <form onSubmit={handleFormSubmitChangePass} style={{ width: "100%" }} >
                        <TextField
                            required
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            sx={{ margin: "0.5rem", width: "100%" }}
                        />
                        <TextField
                            required
                            label="Re-Enter Password"
                            type="password"
                            error={password !== repass && repass !== ""}
                            onChange={(e) => setRepass(e.target.value)}
                            value={repass}
                            name="password"
                            sx={{ margin: "0.5rem", width: "100%" }}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            Change
                        </Button>
                    </form>
                </>
            }
            {
                values?.page === "enteremail" &&
                <form onSubmit={handleFormSubmit} style={{ width: "100%" }} >
                    <TextField
                        required
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        sx={{ margin: "0.5rem", width: "100%" }}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                        }}
                    >
                        proceed
                    </Button>
                </form>
            }
        </FlexBetween>
    )
}

export default ChangePass
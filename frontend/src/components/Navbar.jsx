import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "./Navbar.css"; // Ensure this CSS file is imported

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // This simulates checking for a user token (for example, from localStorage)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Clear the auth token when logging out
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1A1341" }}>
            <Toolbar>
                <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                    {/* SVG logo */}
                    <img src="/BOMALOGO.svg" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
                    <Link to={isLoggedIn ? "/inventory" : "/"} style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontFamily: "Poppins",
                                fontWeight: "bold",
                                color: "#C2E7DA",
                            }}
                        >
                            Tech Haven
                        </Typography>
                    </Link>
                </Box>
                
                {/* Conditional rendering for logged-in state */}
                {isLoggedIn ? (
                    <>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/add-device"
                            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}>
                            Add Device
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/initiate-sale"
                            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}>
                            Initiate Sale
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/recall-receipt"
                            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}>
                            Recall Receipt
                        </Button>
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            sx={{ fontFamily: "Poppins", fontWeight: "medium"}}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}>
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/register"
                            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}>
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

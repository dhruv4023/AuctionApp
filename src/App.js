// Import necessary dependencies and components
import { AllRoutes } from "Components/AllRoutes";
import React, { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme"; // Import theme settings

const App = () => {
  // Get the mode from Redux store
  const mode = useSelector((state) => state.mode);

  // Create a theme based on the selected mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      {/* Set up the router for navigation */}
      <Router>
        {/* Apply the theme to the app */}
        <ThemeProvider theme={theme}>
          {/* Apply CSS baseline for consistent styling */}
          <CssBaseline />
          {/* Render the component responsible for handling all routes */}
          <AllRoutes />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;

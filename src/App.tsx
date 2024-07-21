import { createTheme } from "@mui/material";
import "./App.css";
import AppRouter from "./router";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";

const baseTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily:
        "Poppins, Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize: '14px',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={baseTheme}>
        <AppRouter />
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;

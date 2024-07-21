
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import "./style.scss";
import Header from "../../components/header";

const AppLayout: React.FC = () => {

  return (
    <Box sx={{ width: "100%", height: "fit-content" }}>
      <Box className={"header-container"}>
        <Header className="header-content">View Audience</Header>
      </Box>
      <Box sx={{ width: "100%", height: "fit-content", padding: "20px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout

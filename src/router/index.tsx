import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../pages/appLayout";
import { PATH } from "../utils/constant";
import ViewAudience from "../pages/viewAudience";

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to={PATH.AUDIENCE} />}></Route>
        <Route path="/" element={<Navigate to={PATH.AUDIENCE} />}></Route>
        <Route path="/" element={<AppLayout />}>
          <Route path={PATH.AUDIENCE} element={<ViewAudience />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

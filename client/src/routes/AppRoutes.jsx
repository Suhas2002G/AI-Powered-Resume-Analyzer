import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../middleware/PrivateRoute";

//PAGES
import Home from "../pages/Home";
// import AboutUs from "../pages/About";
// import Contact from "../pages/Contact";
// import Project from "../pages/Project";

//SHARED COMPONENT
// import Login from "../components/auth/Login";
// import Register from "../components/auth/Register";
import Unauthorized from "../components/shared/Unauthorized";
import PageNotFound from "../components/shared/PageNotFound";
import UploadResume from "../pages/UploadResume";
import AtsReport from "../pages/AtsReport";



const AppRoutes = () => {
  return (
    <Routes>
      {/* SHARED ROUTES  */}
      <Route path="/" element={<Home />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/ats-report" element={<AtsReport />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      

      {/* ADMIN + USER ROUTES  */}
      <Route
        path="/resume/analysis"
        element={
          // <PrivateRoute allowedRoles={["admin", "user"]}>
            <UploadResume />
          // </PrivateRoute>
        }
      >

      </Route>

      
    </Routes>
  );
};

export default AppRoutes;

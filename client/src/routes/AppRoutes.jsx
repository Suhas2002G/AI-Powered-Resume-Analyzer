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



const AppRoutes = () => {
  return (
    <Routes>
      {/* SHARED ROUTES  */}
      <Route path="/" element={<Home />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      

      {/* ADMIN + USER ROUTES  */}
      <Route
        path="/resume/analysis"
        element={
          <PrivateRoute allowedRoles={["admin", "user"]}>
            <Project />
          </PrivateRoute>
        }
      >
        {/* <Route path="create" element={<CreateProject />} />
        <Route path="data-import" element={<DataImport />} />
        <Route path="fetch-relationships" element={<FetchRelationships />} />
        <Route path="data-modification" element={<DataModification />} />
        <Route path="column-classifier" element={<ColumnClassifier />} />
        <Route path="hierarchy" element={<HierarchyDetection />} />
        <Route path="plots" element={<Plots />} />
        <Route path="ml-prediction" element={<MLPrediction />} />
        <Route path="ai-reports" element={<AIReports />} /> */}
      </Route>

      
    </Routes>
  );
};

export default AppRoutes;

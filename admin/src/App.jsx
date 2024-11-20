import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AdminDashboard from "./app/dashboard/AdminDashboard";
import DashboardOverview from "./app/dashboard/DashboardOverview";
import CurriculumForm from "./app/dashboard/curriculumForm";
import BulkOperations from "./app/dashboard/bulkOperations";
import CurriculumList from "./app/dashboard/CurriculumList";
import CurriculumDetail from "./app/dashboard/CurriculumDetail";
import EditCurriculum from "./app/dashboard/EditCurriculum";
import Login from "./pages/AdminLoginForm";
import AdminSignupForm from "./pages/AdminSignupForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<AdminSignupForm />} />
        <Route path="/login" element={<Login />} />

        {/* New Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard-overview" element={<DashboardOverview />} />
          <Route path="curriculum" element={<CurriculumForm />} />
          <Route path="bulk-operations" element={<BulkOperations />} />
          <Route path="curriculum-list" element={<CurriculumList />} />
          <Route
            path="curriculum/:curriculumId"
            element={<CurriculumDetail />}
          />
          <Route path="edit-curriculum/:curriculumId" element={<EditCurriculum />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

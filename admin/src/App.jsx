import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Button } from './components/ui/button';
import Page from './app/dashboard/Page'; // Your main dashboard layout
import CurriculumForm from './app/dashboard/curriculumForm'; // Your curriculum form component
import ManageCurriculum from './app/dashboard/manageCurriculum'; // Your manage curriculum component
import BulkOperations from './app/dashboard/bulkOperations'; // Your bulk operations component
import CurriculumList from './app/dashboard/CurriculumList'; // Your curriculum list component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route or main content */}
        <Route path="/" element={
          <>
            <Button>Click me</Button>
          </>
        } />

        {/* Dashboard route with nested routes */}
        <Route path="/dashboard" element={<Page />}>
          <Route path="curriculum" element={<CurriculumForm />} />
          <Route path="manage-curriculum" element={<ManageCurriculum />} />
          <Route path="bulk-operations" element={<BulkOperations />} />
          <Route path="curriculum-list" element={<CurriculumList />} /> {/* New route for curriculum list */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

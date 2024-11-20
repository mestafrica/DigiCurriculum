import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./app/dashboard/page";
import DevLogin from "./components/DevLogin";
import DevPasswordRem from "./components/DevPasswordRem";
import DeveloperSignup from "./components/DevSignup";
import DevDashboard from "./components/DevDashboard/DevDashboard"; // Ensure this points to your dashboard
import GettingStarted from "./components/GettingStarted";
import Installation from "./components/Installation";
import Contribution from "./components/Contribution";
import CurriculumStructure from "./components/CurriculumStructure";
import CurriculumEndpoints from "./components/CurriculumEndpoints";
import GetAllCurricula from "./components/GetAllCurricula";
import GetCurriculumByGrade from "./components/GetCurriculumByGrade";
import SearchCurriculum from "./components/SearchCurriculum";
import GetAssessment from "./components/GetAssessment";
import ListAssessments from "./components/ListAssessments";
import AssessmentEndpoints from "./components/AssessmentEndpoints";
import AssessmentGeneration from "./components/AssessmenGeneration";

const App = () => {
  const router = createBrowserRouter([
    { path: "/devlogin", element: <DevLogin /> },
    { path: "/devsignup", element: <DeveloperSignup /> },
    { path: "/devpasswordreset", element: <DevPasswordRem /> },
    {
      path: "/devdashboard/*", // Add wildcard here to include nested routes
      element: <DevDashboard />, // DevDashboard now includes its own routing for sidebar links
    },
    {
      path: "/",
      element: <Page />,
      children: [
        { path: "", element: <GettingStarted /> },
        { path: "gettingstarted/curriculum", element: <CurriculumStructure /> },
        { path: "curriculum/overview", element: <CurriculumEndpoints /> },
        { path: "curriculum/list", element: <GetAllCurricula /> },
        { path: "curriculum/grade", element: <GetCurriculumByGrade /> },
        { path: "curriculum/search", element: <SearchCurriculum /> },
        { path: "assessment", element: <GetAssessment /> },
        { path: "assessment/overview", element: <AssessmentEndpoints /> },
        { path: "generate/assessment", element: <AssessmentGeneration /> },
        { path: "assessment/list", element: <ListAssessments /> },
        { path: "installation", element: <Installation /> },
        { path: "contribution-guide", element: <Contribution /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
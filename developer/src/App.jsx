import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./app/dashboard/page";
import DevLogin from "./components/DevLogin";
import DevPasswordRem from "./components/DevPasswordRem";
import DeveloperSignup from "./components/DevSignup";
import DevDashboard from "./components/DevDashboard/DevDashboard";  // Ensure this points to your dashboard
import GettingStarted from "./components/GettingStarted";
import Installation from "./components/Installation";
import Contribution from "./components/Contribution";

const App = () => {
  const router = createBrowserRouter([
    { path: "/devlogin", element: <DevLogin /> },
    { path: "/devsignup", element: <DeveloperSignup /> },
    { path: "/devpasswordreset", element: <DevPasswordRem /> },
    {
      path: "/devdashboard/*",  // Add wildcard here to include nested routes
      element: <DevDashboard />,  // DevDashboard now includes its own routing for sidebar links
    },
    {
      path: "/",
      element: <Page />,
      children: [
        { path: "gettingstarted", element: <GettingStarted /> },
        { path: "installation", element: <Installation /> },
        { path: "contribution-guide", element: <Contribution /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

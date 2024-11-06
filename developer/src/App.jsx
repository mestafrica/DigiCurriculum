import Page from "./app/dashboard/page";
import DevLogin from "./components/DevLogin";
import DevPasswordRem from "./components/DevPasswordRem";
import DeveloperSignup from "./components/DevSignup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



const App = () => {
  const router = createBrowserRouter([
    { path: "/devlogin", element: <DevLogin /> },
    { path: "/devsignup", element: <DeveloperSignup /> },
    { path: "/devpasswordreset", element: <DevPasswordRem /> },
    {path:"/", element: <Page/>},

  ])

  return <RouterProvider router={router} />;
};

export default App;

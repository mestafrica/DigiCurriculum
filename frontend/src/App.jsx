import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/register/Signup";
import CompleteSignup from "./pages/register/OtpPage";
import Profile from "./pages/register/Profile";
import SignIn from "./pages/register/Login";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/completesignup", element: <CompleteSignup /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/about", element: <AboutPage /> },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

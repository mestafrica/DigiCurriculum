import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/register/Signup";
import CompleteSignup from "./pages/register/OtpPage";
import Profile from "./pages/register/Profile";
import SignIn from "./pages/register/Login";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AIAssistant from "./pages/AIAssistant";


const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/otp", element: <CompleteSignup /> },
  { path: "/completesignup", element: <CompleteSignup /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/assistant", element: <AIAssistant /> },
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

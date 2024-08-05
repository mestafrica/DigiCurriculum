import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/register/Signup";
import CompleteSignup from "./pages/register/CompleteSignup";
import Profile from "./pages/register/Profile";
import SignIn from "./pages/register/Login";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/completesignup", element: <CompleteSignup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/signin", element: <SignIn /> },
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

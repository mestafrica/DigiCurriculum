// frontend/src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/register/Signup";
import CompleteSignup from "./pages/register/OtpPage";
import Profile from "./pages/register/Profile";
import SignIn from "./pages/register/Login";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

// 👇 Import the dashboard entry points
import StudentRoom from "../../dashboard/src/components/Student/StudentDashboardPages/Studentroom.jsx";
import TeacherRoom from "../../dashboard/src/components/Teacher/TeacherDashboardPages/Teacherroom.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/completesignup", element: <CompleteSignup /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/about", element: <AboutPage /> },

  // 👇 new ones
  { path: "/student/*", element: <StudentRoom /> },
  { path: "/teacher/*", element: <TeacherRoom /> },
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

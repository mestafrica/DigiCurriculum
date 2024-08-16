import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Backoffice from "./components/Admin/AdminDashboardPages/Backoffice";
import Dashboard from "./components/Admin/AdminDashboardPages/Dashboard";
import BroadcastList from "./components/Admin/AdminDashboardPages/Broadcastlist";
import Users from "./components/Admin/AdminDashboardPages/Users";
import ProfileDetailsAdmin from "./components/Admin/Profile/ProfileDetailsAdmin";
import Broadcast from "./components/Admin/AdminDashboardPages/Broadcasts";
import StudentRoom from "./components/Student/StudentDashboardPages/Studentroom";
import StudentDashboard from "./components/Student/StudentDashboardPages/Dashboard";
import Tasks from "./components/Student/StudentDashboardPages/Tasks";
import Tools from "./components/Student/StudentDashboardPages/Tools";
import { Library } from "lucide-react";
import ProfileDetailStudent from "./components/Student/Profile/profileDetailsAdmin";
import Lessons from "./components/Teacher/TeacherDashboardPages/Lessons";
import AiTools from "./components/Teacher/TeacherDashboardPages/Tools";
import Materials from "./components/Teacher/TeacherDashboardPages/Materials";
import Readytouse from "./components/Teacher/TeacherDashboardPages/Readytouse";
import Calendar from "./components/Teacher/TeacherDashboardPages/Calendar";
import ProfileDetailsTeacher from "./components/Teacher/Profile/profileDetailsTeacher";
import StudentLibrary from "./components/Student/StudentDashboardPages/Library";
import TeacherDashboard from "./components/Teacher/TeacherDashboardPages/Teacherroom";
import TeacherRoom from "./components/Teacher/TeacherDashboardPages/Teacherroom";
import Home from "./components/Teacher/TeacherDashboardPages/Dashboard";
import Curriculum from "./components/Admin/AdminDashboardPages/Curriculum";
import Assessment from "./components/Admin/AdminDashboardPages/Assessment";
import AdminCalendar from "./components/Admin/AdminDashboardPages/Calendar";


const routes = [
  {
    path: "/",
    element: <Backoffice />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "curriculum", element: <Curriculum /> },
      { path: "assessment", element: <Assessment /> },
      { path: "calendar", element: <AdminCalendar /> },
      { path: "broadcasts", element: <BroadcastList /> },
      { path: "users", element: <Users /> },
      { path: "settings", element: <ProfileDetailsAdmin /> },
      { path: "create/broadcast", element: <Broadcast /> },
    ],
  },
  {
    path: "/student",
    element: <StudentRoom />,
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "tasks", element: <Tasks /> },
      { path: "tools", element: <Tools /> },
      { path: "library", element: <StudentLibrary/> },
      { path: "settings", element: <ProfileDetailStudent/> },
    ],
  },
  {
    path: "/teacher",
    element: <TeacherRoom />,
    children: [
      { path: "dashboard", element: <Home/> },
      { path: "lessons", element: <Lessons /> },
      { path: "calendar", element: <Calendar /> },
      { path: "tools", element: <AiTools /> },
      { path: "material", element: <Materials /> },
      { path: "ready", element: <Readytouse /> },
      { path: "settings", element: <ProfileDetailsTeacher/> },
    ],
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children?.map((child, childIndex) => (
              <Route key={childIndex} path={child.path} element={child.element} />
            ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

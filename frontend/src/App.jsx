import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// ============ Public Pages ============
import Home from "./pages/Home";
import Signup from "./pages/register/Signup";
import CompleteSignup from "./pages/register/OtpPage";
import Profile from "./pages/register/Profile";
import SignIn from "./pages/register/Login";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AIAssistant from "./pages/AIAssistant";

// ============ Protected Route ============
import ProtectedRoute from "./routes/ProtectedRoute";

// ============ Admin Dashboard ============
import Backoffice from "./components/dashboard/Admin/AdminDashboardPages/Backoffice";
import AdminDashboard from "./components/dashboard/Admin/AdminDashboardPages/Dashboard";
import BroadcastList from "./components/dashboard/Admin/AdminDashboardPages/Broadcastlist";
import Users from "./components/dashboard/Admin/AdminDashboardPages/Users";
import Broadcast from "./components/dashboard/Admin/AdminDashboardPages/Broadcasts";
import Curriculum from "./components/dashboard/Admin/AdminDashboardPages/Curriculum";
import Assessment from "./components/dashboard/Admin/AdminDashboardPages/Assessment";
import AdminCalendar from "./components/dashboard/Admin/AdminDashboardPages/Calendar";

// ============ Student Dashboard ============
import StudentRoom from "./components/dashboard/Student/StudentDashboardPages/Studentroom";
import StudentDashboard from "./components/dashboard/Student/StudentDashboardPages/Dashboard";
import Tasks from "./components/dashboard/Student/StudentDashboardPages/Tasks";
import StudentTools from "./components/dashboard/Student/StudentDashboardPages/Tools";
import ProfileDetailStudent from "./components/dashboard/Student/Profile/profileDetailsAdmin";
import StudentLibrary from "./components/dashboard/Student/StudentDashboardPages/Library";
import CreateTask from "./components/dashboard/Student/StudentDashboardPages/CreateTask";
import EditTask from "./components/dashboard/Student/StudentDashboardPages/editTask";

// ============ Teacher Dashboard ============
import TeacherRoom from "./components/dashboard/Teacher/TeacherDashboardPages/Teacherroom";
import TeacherHome from "./components/dashboard/Teacher/TeacherDashboardPages/Dashboard";
import Lessons from "./components/dashboard/Teacher/TeacherDashboardPages/Lessons";
import TeacherTools from "./components/dashboard/Teacher/TeacherDashboardPages/Tools";
import Materials from "./components/dashboard/Teacher/TeacherDashboardPages/Materials";
import Readytouse from "./components/dashboard/Teacher/TeacherDashboardPages/Readytouse";
import TeacherCalendar from "./components/dashboard/Teacher/TeacherDashboardPages/Calendar";
import ProfileDetailsTeacher from "./components/dashboard/Teacher/Profile/profileDetailsTeacher";

// ============ Routes Configuration ============
const publicRoutes = [
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
        {/* ============ Public Routes ============ */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* ============ Student Dashboard Routes ============ */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentRoom />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tools" element={<StudentTools />} />
          <Route path="library" element={<StudentLibrary />} />
          <Route path="settings" element={<ProfileDetailStudent />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="tasks/:id/edit" element={<EditTask />} />
        </Route>

        {/* ============ Teacher Dashboard Routes ============ */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["Teacher"]}>
              <TeacherRoom />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeacherHome />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="calendar" element={<TeacherCalendar />} />
          <Route path="tools" element={<TeacherTools />} />
          <Route path="material" element={<Materials />} />
          <Route path="ready" element={<Readytouse />} />
          <Route path="profile" element={<ProfileDetailsTeacher />} />
        </Route>

        {/* ============ Admin Dashboard Routes ============ */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Backoffice />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="broadcasts" element={<BroadcastList />} />
          <Route path="users" element={<Users />} />
          <Route path="create/broadcast" element={<Broadcast />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

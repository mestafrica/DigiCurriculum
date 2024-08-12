import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Backoffice from "./components/Admin/DashboardPages/Backoffice";
import Dashboard from "./components/Admin/DashboardPages/Dashboard";
import BroadcastList from "./components/Admin/DashboardPages/Broadcastlist";
import Users from "./components/Admin/DashboardPages/Users";
import ProfileDetailsAdmin from "./components/Admin/Profile/ProfileDetailsAdmin";
import Broadcast from "./components/Admin/DashboardPages/Broadcasts";


const routes = [
  {
    path: "/admin-dashboard",
    element: <Backoffice />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "broadcasts", element: <BroadcastList /> },
      { path: "users", element: <Users /> },
      { path: "settings", element: <ProfileDetailsAdmin /> },
      { path: "create/broadcast", element: <Broadcast /> },
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

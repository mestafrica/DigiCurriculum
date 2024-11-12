import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/AdminLoginForm";
import AdminSignupForm from "./pages/AdminSignupForm";
import Otp from "./pages/Otp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<AdminSignupForm />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;

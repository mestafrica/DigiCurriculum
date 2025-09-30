// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get(`https://digicurriculum.onrender.com/user/${userId}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading user data...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.userType}</p>
        <p><strong>School:</strong> {user.school}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default Dashboard;

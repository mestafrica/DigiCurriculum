import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { getUserById } from "../../../../services/authService";
import image from "../../../../assets/dashboard/Images/lesson.svg";
import image2 from "../../../../assets/dashboard/Images/calendar.svg";
import image3 from "../../../../assets/dashboard/Images/assignment.svg";

const StudentDashboard = () => {
  const { token, userId } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");
    let userId = urlParams.get("userId");

    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    } else {
      token = localStorage.getItem("token");
      userId = localStorage.getItem("userId");
    }

    if (!token || !userId) return;

    const fetchUserInfo = async () => {
      try {
        const response = await getUserById(userId, token);
        setUserInfo(response.user || response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="mt-24 px-4 md:px-20 w-full text-foreground">
      {/* Greeting Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Hello,{" "}
          <span className="text-primary text-orange-500">
            {userInfo?.firstName || "Loading..."}
          </span>
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Let's create amazing learning experiences together ✨
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Lesson Notes */}
        <div className="p-6 bg-yellow-50 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer">
          <img src={image} alt="lesson-notes" className="w-16 mx-auto" />
          <h2 className="text-xl font-semibold text-center mt-4">
            Lesson Notes
          </h2>
          <p className="text-muted-foreground text-center mt-2">
            Easily generate structured lesson notes.
          </p>
        </div>

        {/* Lesson Calendar */}
        <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer">
          <img src={image2} alt="lesson-calendar" className="w-16 mx-auto" />
          <h2 className="text-xl font-semibold text-center mt-4">
            Lesson Calendar
          </h2>
          <p className="text-muted-foreground text-center mt-2">
            Prepare your lesson calendar instantly.
          </p>
        </div>

        {/* Assignment */}
        <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer">
          <img src={image3} alt="assignment" className="w-16 mx-auto" />
          <h2 className="text-xl font-semibold text-center mt-4">Assignment</h2>
          <p className="text-muted-foreground text-center mt-2">
            Generate customized student assignments effortlessly.
          </p>
        </div>
      </div>

      {/* Explore Button */}
      <div className="mt-10 flex justify-center">
        <button className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition font-medium py-4 px-10 rounded-full shadow-md w-full md:w-auto">
          Explore our suite of tools tailored to your teaching needs
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard; 

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../../../context/AuthContext"; // ✅ single import
// import { getUserById } from "../../../../services/authService";
// import image from "../../../../assets/dashboard/Images/lesson.svg";
// import image2 from "../../../../assets/dashboard/Images/calendar.svg";
// import image3 from "../../../../assets/dashboard/Images/assignment.svg";

// const StudentDashboard = () => {
//   const { token, userId } = useAuth();
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     // Grab query params first
//     const urlParams = new URLSearchParams(window.location.search);
//     let token = urlParams.get("token");
//     let userId = urlParams.get("userId");

//     if (token && userId) {
//       // ✅ Save in localStorage for persistence
//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", userId);
//     } else {
//       // Fallback: use localStorage
//       token = localStorage.getItem("token");
//       userId = localStorage.getItem("userId");
//     }

//     if (!token || !userId) {
//       console.error("❌ No auth info found (token/userId missing)");
//       return;
//     }

//     const fetchUserInfo = async () => {
//       try {
//         const response = await getUserById(userId, token);
//         setUserInfo(response.user || response);
//       } catch (error) {
//         console.error("❌ Error fetching user:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   return (
//     <div className="mt-14 md:mt-24 w-[90%] md:w-full md:mx-0 mx-auto md:p-24 p-4 bg-background pt-6 md:pt-0">
//       <h1 className="text-2xl font-semibold text-foreground">
//         Hello, {userInfo?.firstName || "Loading..."}
//       </h1>
//       <p className="text-muted-foreground">
//         Let's create amazing learning experiences together.
//       </p>

//       <div className="flex items-center justify-center md:h-96 h-auto mt-6">
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
//           <div className="bg-card bg-yellow-50 p-4 rounded-lg shadow-md">
//             <div className="items-center">
//               <img alt="lesson-notes" src={image} className="mr-2" />
//               <h2 className="font-semibold">Lesson Notes</h2>
//             </div>
//             <p className="text-muted-foreground">
//               Easily generate lesson notes
//             </p>
//           </div>

//           <div className="bg-card bg-green-50 p-4 rounded-lg shadow-md">
//             <div className="items-center">
//               <img alt="lesson-calendar" src={image2} className="mr-2" />
//               <h2 className="font-semibold">Lesson Calendar</h2>
//             </div>
//             <p className="text-muted-foreground">
//               Prepare your lesson calendar with just a click
//             </p>
//           </div>

//           <div className="bg-card bg-blue-50 p-4 rounded-lg shadow-md col-span-2 md:col-span-1">
//             <div className="items-center">
//               <img alt="assignment" src={image3} className="mr-2" />
//               <h2 className="font-semibold">Assignment</h2>
//             </div>
//             <p className="text-muted-foreground">
//               Easily generate assignments tailored to your students' needs
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="md:m-6 m-4 mt-6">
//         <button className="bg-secondary text-secondary-foreground hover:bg-primary py-4 px-16 rounded-full w-full">
//           Explore our suite of tools tailored to your teaching needs
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

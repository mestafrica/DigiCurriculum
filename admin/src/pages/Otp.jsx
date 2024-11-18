// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { Link } from "react-router-dom";
// import axios from "axios"; 
// import "react-toastify/dist/ReactToastify.css";

// const Otp = () => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [isOtpComplete, setIsOtpComplete] = useState(false);

//   // Handles OTP input changes
//   const handleOtpChange = (e, index) => {
//     const value = e.target.value;
//     if (/[^0-9]/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       document.getElementById(`otp-input-${index + 1}`).focus();
//     }

//     if (newOtp.join("").length === 4) {
//       setIsOtpComplete(true);
//     } else {
//       setIsOtpComplete(false);
//     }
//   };

//   // Submit OTP
//   const handleSubmit = async () => {
//     const enteredOtp = otp.join("");
//     console.log("OTP Submitted: ", enteredOtp);

//     try {
//       // Send the OTP to your backend endpoint
//       const response = await axios.get("https://digitizing-the-ges-curriculum-21yp.onrender.com/admin/verify-otp", {
//         otp: enteredOtp,
//       });

//       if (response.status === 201) {
//         toast.success("OTP verified successfully!");
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Error during OTP verification:", error.response);
//       toast.error(error.response?.data?.message || "OTP verification failed. Please try again.");
      
//     }
//   };

//   // Auto-submit OTP when complete
//   useEffect(() => {
//     if (isOtpComplete) {
//       handleSubmit();
//     }
//   }, [isOtpComplete]);

//   // Handle Resend OTP

//   const handleResendOtp = async () => {
//     try {
//       const response = await axios.post("https://digitizing-the-ges-curriculum-21yp.onrender.com/admin/resend-otp");
//       if (response.status === 200) {
//         toast.info("OTP resent successfully!");
//       }
//     } catch (error) {
//       toast.error("Failed to resend OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
//         <div className="p-6 w-full">
//           <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>

//           <form onSubmit={(e) => e.preventDefault()}>
//             <div className="flex space-x-2 mb-4 justify-center">
//               {otp.map((value, index) => (
//                 <input
//                   key={index}
//                   id={`otp-input-${index}`}
//                   type="text"
//                   value={value}
//                   onChange={(e) => handleOtpChange(e, index)}
//                   maxLength={1}
//                   className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-[#456990] focus:border-[#456990]"
//                   placeholder="-"
//                 />
//               ))}
//             </div>

//             <div className="text-center mt-4">
//               <Link
//                 to="#"
//                 onClick={handleResendOtp}
//                 className="text-[#456990] hover:underline"
//               >
//                 Resend OTP
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//     </div>
//   );
// };

// export default Otp;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ add this

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>   {/* ✅ wrap your App */}
      <App />
    </AuthProvider>
  </StrictMode>
);

// frontend/src/utils/logout.js
const FRONTEND_LANDING = "/";

export function logoutAndRedirect(redirectTo = FRONTEND_LANDING) {
  try {
    // remove only the auth keys we use (safer than clear())
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("sidebarIndex");
    // remove any session storage too
    sessionStorage.clear();

    // force full reload to guarantee all React state is reset
    window.location.href = redirectTo;
  } catch (err) {
    // fallback
    window.location.href = redirectTo;
  }
}

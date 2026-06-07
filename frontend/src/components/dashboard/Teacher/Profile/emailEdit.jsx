import { useEffect, useRef, useState } from "react";
import axios from "axios";

function EditEmail({ closeModel }) {
  const modelRef = useRef();
  const [form, setForm] = useState({ email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const baseUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080";

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${baseUrl}/user/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const user = res.data.user || res.data;
      setForm({ email: user.email || "" });
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    setSuccessMsg("");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!form.email || !emailRegex.test(form.email)) return;

    setIsLoading(true);
    try {
      await axios.patch(
        `${baseUrl}/update-user/${userId}`,
        { email: form.email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg("Email updated successfully!");
      setTimeout(() => closeModel(), 1500);
    } catch (err) {
      console.error("Email update error:", err);
      setError(
        err.response?.data?.message || "Failed to update email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const refCloseFormModel = (e) => {
    if (modelRef.current === e.target) closeModel();
  };

  return (
    <div
      ref={modelRef}
      onClick={refCloseFormModel}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center text-white z-50 p-4 animate-fade-in"
    >
      <div className="w-full max-w-md">
        <div className="bg-white text-gray-800 shadow-2xl rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Update Email</h2>
            <button
              type="button"
              onClick={closeModel}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none transition focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent ${
                    submitted && (!form.email || !/\S+@\S+\.\S+/.test(form.email))
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200"
                  }`}
                  required
                />
                {!submitted && (
                  <p className="mt-1 text-sm text-gray-400">
                    Please make sure you provide a valid email address.
                  </p>
                )}
                {submitted && !form.email && (
                  <p className="mt-1 text-sm text-red-600">
                    <span className="font-medium">Oops!</span> Email address is required!
                  </p>
                )}
                {submitted && form.email && !/\S+@\S+\.\S+/.test(form.email) && (
                  <p className="mt-1 text-sm text-red-600">
                    <span className="font-medium">Oops!</span> Please provide a valid email address!
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={closeModel}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center px-6 py-2.5 rounded-xl font-bold text-white transition ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Email"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmail;

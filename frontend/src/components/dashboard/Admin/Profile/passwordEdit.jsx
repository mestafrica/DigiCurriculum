import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAlert from "../../Auth-Alert/AuthAlert";
import axios from "axios";
import LitLoader from "../../Loader/LitLoader";

function EditPassword({ closeModel }) {
  const modelRef = useRef();
  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("user_id");

  const isValidForm = () => {
    const { oldPassword, password, confirmPassword } = form;
    return (
      oldPassword &&
      password &&
      confirmPassword &&
      password.length >= 8 &&
      password === confirmPassword
    );
  };

  const getFormData = () => {
    const { oldPassword, password, confirmPassword } = form;
    return {
      oldPassword: oldPassword,
      password: password,
      password_confirmation: confirmPassword,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isValidForm()) {
      setIsLoading(true);
      try {
        const passwordUpdate = getFormData();
        const response = await axios.post(
          `http://3.89.152.217/api/v1/changePassword/${userId}`,
          passwordUpdate
        );
        console.log(response);
        // localStorage.setItem("__user_id", response.data.id);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const refCloseFormModel = (e) => {
    if (modelRef.current === e.target) {
      closeModel();
    }
  };


  return (
    <div
      ref={modelRef}
      onClick={refCloseFormModel}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-white"
    >
      <div className="w-full lg:w-1/3 p-4">
        <div className="backdrop-blur-sm bg-white/10 border border-secondary shadow-lg rounded-lg p-4">
          <div className="flex justify-between border-b pb-2">
            <h2 className="text-xl font-bold text-textColor">Edit password</h2>
            <div className="flex">
              <button className="text-primary font-semibold">User info</button>
            </div>
          </div>
          {errorMessage && (
            <AuthAlert
              errorTitle={errorMessage}
              errorMessage="Please check try again!"
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <label
                  htmlFor="old password"
                  className="block text-textColor text-sm font-bold mb-2"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  id="old password"
                  value={form.oldPassword}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-700 ${
                    submitted &&
                    (!form.oldPassword || form.oldPassword.length < 8)
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700"
                      : ""
                  }`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-textColor text-sm font-bold mb-2"
                >
                  New password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-700 ${
                    submitted && (!form.password || form.password.length < 8)
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700"
                      : ""
                  }`}
                  required
                />
                {!submitted && (
                  <p
                    id="password-helper-text"
                    className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Password must be at least 8 characters or more.
                  </p>
                )}
                {submitted && !form.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> Password is
                    required!
                  </p>
                )}
                {submitted && form.password.length < 8 && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> Password must be
                    at least 8 characters!
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-textColor text-sm font-bold mb-2"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-700 ${
                    submitted &&
                    (!form.confirmPassword ||
                      form.confirmPassword !== form.password)
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700"
                      : ""
                  }`}
                  required
                />
                {!submitted && (
                  <p
                    id="c-password-helper"
                    className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Make sure this matches the above password.
                  </p>
                )}
                {submitted && !form.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> Confirm Password
                    is required!
                  </p>
                )}
                {submitted && form.confirmPassword !== form.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> Passwords do not
                    match!
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <div className="flex justify-center">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="mt-4 text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center"
                  >
                    Update
                  </button>
                ) : (
                  <LitLoader />
                )}
              </div>

              <button
                onClick={closeModel}
                className="mt-4 text-white bg-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center"
              >
                close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import LitLoader from "../../Loader/LitLoader";
import AuthAlert from "../../Auth-Alert/AuthAlert";

function EditEmail({ closeModel }) {
  const modelRef = useRef();
  const [form, setForm] = useState({
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");


  const isValidForm = () => {
    const { email } = form;
    return email && email;
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://3.89.152.217/api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setForm({
          email: result.email,
        });
      })
      .catch((error) => console.error(error));
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

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://3.89.152.217/api/v1/editProfile",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: form.email,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Update Successfull!")
        setTimeout(()=>{
          closeModel();
        }, 1000);
        setIsLoading(false);
      })
      .catch((error) => {
        // setErrorMessage(error.message)
        alert(error.response.data.message);
        console.log(error);
        setIsLoading(false);
      });
  }
  }

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
        <div className="bg-white border-secondary shadow-lg rounded-lg p-4">
          <div className="flex justify-between border-b pb-2">
            <h2 className="text-xl font-bold text-black">Update email</h2>
            <div className="flex">
              <button className="text-primary font-semibold">Email</button>
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
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-primary dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-100${
                    submitted &&
                    (!form.email || !/\S+@\S+\.\S+/.test(form.email))
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700"
                      : ""
                  }`}
                  required
                />
                {!submitted && (
                  <p
                    id="email-helper-text"
                    className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Please make sure you provide a valid email address.
                  </p>
                )}
                {submitted && !form.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span> Email address is
                    required!
                  </p>
                )}
                {submitted &&
                  form.email &&
                  !/\S+@\S+\.\S+/.test(form.email) && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span> Please provide
                      a valid email address!
                    </p>
                  )}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <div className="flex justify-center">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="mt-4 text-gray-700 bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 inline-flex items-center"
                  >
                    Update
                  </button>
                ) : (
                  <LitLoader />
                )}
              </div>

              <button
                onClick={closeModel}
                className="mt-4 text-gray-700 bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 inline-flex items-center"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmail;

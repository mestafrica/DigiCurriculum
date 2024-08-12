import React, { useState } from "react";
import axios from "axios";

const Broadcast = () => {
  const token = sessionStorage.getItem("token")
  
  const [form, setForm] = useState({
    subject: "",
    message: "",
    channel: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    if (form.subject && form.message && form.channel) {
      setIsLoading(true);
      try {
        const response =
          form.channel === "1"
            ? await sendNotificationBroadcast()
            : form.channel === "2"
            ? await sendEmailBroadcast()
            : form.channel === "3"
            ? await sendBothBroadcast()
            : "";
            // console.log(response)
        if (response.status === 200) {
          alert(`${response.data.message}`)
          setTimeout(()=>{
            window.location.href = "/admin-dashboard/broadcasts";
          })
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sendNotificationBroadcast = async () => {
    const message = {
      subject: form.subject,
      message: form.message,
    };
    console.log({ message });
    return await axios.post(
      "http://3.89.152.217/api/v1/broadcast-message-to-notification",
      {
        message: message.message,
        subject: message.subject,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const sendEmailBroadcast = () => {
    const message = {
      subject: form.subject,
      message: form.message,
    };
    return axios.post(
      "http://3.89.152.217/api/v1/broadcast-message-to-email",
      {
        message: message.message,
        subject: message.subject,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const sendBothBroadcast = () => {
    const message = {
      subject: form.subject,
      message: form.message,
    };
    return axios.post(
      "http://3.89.152.217/api/v1/broadcast-message-to-email-and-notification",
      {
        message: message.message,
        subject: message.subject,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div className="px-4 pt-6">
    <div className="p-4 backdrop-blur-sm bg-black/10 border border-gray-300 rounded-lg shadow-sm sm:p-6">
      <div className="items-center justify-between lg:flex">
        <div className="mb-4 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-gray-800">Create Broadcast</h3>
          <span className="text-base font-normal text-gray-600">
            Create and broadcast messages to all users
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-lg space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-500 text-gray-800 ${
                        submitted && !form.subject
                          ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                          : ""
                      }`}
                      required
                    />
                    {submitted && !form.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        <span className="font-medium">Oops!</span> Subject is required!
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="channel"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Select Channel
                    </label>
                    <select
                      id="channel"
                      name="channel"
                      value={form.channel}
                      onChange={handleChange}
                      className={`border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-500 text-gray-800 ${
                        submitted && !form.channel
                          ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                          : ""
                      }`}
                      required
                    >
                      <option value="" disabled>
                        Select a channel
                      </option>
                      <option value="1">Notification</option>
                      <option value="2">Email</option>
                      <option value="3">Both</option>
                    </select>
                    {submitted && !form.channel && (
                      <p className="mt-1 text-sm text-red-500">
                        <span className="font-medium">Oops!</span> Please select a channel!
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Type your message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-300 placeholder-gray-500 text-gray-800 ${
                      submitted && !form.message
                        ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="This is a sample broadcast message to all users!"
                    rows="5"
                    required
                  ></textarea>
                  {submitted && !form.message && (
                    <p className="mt-1 text-sm text-red-500">
                      <span className="font-medium">Oops!</span> Message is required!
                    </p>
                  )}
                </div>
                <div className="items-center sm:flex">
                  <div className="flex items-center">
                    {isLoading ? (
                      <div className="mb-4 sm:mb-0 mr-4 inline-flex items-center bg-blue-200 border border-blue-300 focus:outline-none hover:bg-blue-500 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 hover:border-gray-300 focus:ring-gray-300">
                        Sending...
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="mb-4 sm:mb-0 mr-4 inline-flex items-center border focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 hover:border-gray-300"
                      >
                        Send Broadcast
                      </button>
                    )}
                  </div>
                </div>
                {errorMessage && (
                  <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Broadcast;

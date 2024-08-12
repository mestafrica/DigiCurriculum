import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const BroadcastList = () => {
  const token = sessionStorage.getItem("token")
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [broadcastList, setBroadcastList] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter state for channel

  useEffect(() => {
    fetchBroadcasts();
  }, []);

  const fetchBroadcasts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://3.89.152.217/api/v1/all-broadcasted-messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.allBroadcastedMessages);
      const result = response.data.allBroadcastedMessages;
      setBroadcastList(result.data);
    } catch (error) {
      console.error("Error fetching broadcast messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openBroadcastMessage = () => {
    window.location.href = "/admin-dashboard/create/broadcast";
  };

  const deleteBroadcast = async (broadcastId) => {
    setIsDeleting(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://3.89.152.217/api/v1/delete-message-broadcast/${broadcastId}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        alert(`${response.data.message}`);
        fetchBroadcasts();
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        alert(`${error}`);
        console.log(error);
      });

    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBroadcastList((prevList) =>
        prevList.filter((broadcast) => broadcast.id !== broadcastId)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBroadcasts = broadcastList.filter((broadcast) =>
    filter === "all"
      ? true
      : filter === "push"
      ? broadcast.channel === 1
      : broadcast.channel === 2
  );

  return (
    <div className="px-4 pt-6">
      <div className="p-4 backdrop-blur-sm bg-white/10 border border-secondary rounded-lg shadow-sm sm:p-6">
        <div className="items-center justify-between lg:flex">
          <div className="mb-4 lg:mb-0">
            <h3 className="mb-2 text-xl font-bold text-textColor">
              Broadcast Messages
            </h3>
            <span className="text-base font-normal text-gray-400">
              This is a list of all your broadcasted messages
            </span>
          </div>
          <div className="items-center sm:flex">
            <div className="flex items-center">
              <button
                onClick={openBroadcastMessage}
                className="mb-4 sm:mb-0 mr-4 inline-flex items-center borderfocus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                type="button"
              >
                Create New Broadcast
              </button>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4 sm:mb-0 mr-4 inline-flex items-center border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
              >
                <option value="all">All Channels</option>
                <option value="push">Push</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow sm:rounded-lg">
                {isLoading ? (
                  <div className="flex justify-center text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-600 animate-spin  fill-accent"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left uppercase text-white"
                        >
                          Subject
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left uppercase text-white"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left uppercase text-white"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left uppercase text-white"
                        >
                          Channel
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium tracking-wider text-left uppercase text-white"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                      {filteredBroadcasts.map((broadcast) => (
                        <tr key={broadcast.id}>
                          <td className="p-4 text-sm font-normal whitespace-nowrap text-white">
                            <span className="font-semibold">
                              {broadcast.subject.substring(0, 50) + " ..."}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-normal max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap text-white">
                            {broadcast.message.substring(0, 50) + " ..."}
                          </td>
                          <td className="p-4 text-sm font-normal whitespace-nowrap text-gray-400">
                            {format(
                              new Date(broadcast.created_at),
                              "dd/MM/yyyy HH:mm"
                            )}
                          </td>
                          <td className="p-4 text-sm font-normal whitespace-nowrap text-white">
                            {broadcast.channel === 1 ? "Push" : "Email"}
                          </td>
                          <td className="p-4 text-sm font-normal whitespace-nowrap text-gray-400">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 mr-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 bg-red-600 hover:bg-red-700 focus:ring-red-900"
                              onClick={() => deleteBroadcast(broadcast.id)}
                              disabled={isDeleting}
                            >
                              {isDeleting ? (
                                <svg
                                  className="w-4 h-4 mr-2 animate-spin text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastList;


import React, { useEffect, useState } from "react";
import axios from "axios";
// import FileUpload from "./BulkUploads";
import { token } from "../../../../config";

const UserList = () => {
//   const token = sessionStorage.getItem("token");

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersModal, setUsersModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const getUsersList = async () => {
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(
        "https://.....com/api/v1/all-registered-users",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const usersList = result.users.data;
          if (usersList) {
            setUserList(usersList);
          }
        });
    } catch (error) {
      console.error("Error fetching broadcast messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const disableUser = async (userId) => {
    try {
      await axios.post(
        `https://.....com/api/v1/disableUser/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUsersList();
    } catch (error) {
      console.error(error);
    }
  };

  const enableUser = async (userId) => {
    try {
      await axios.post(
        `https://.....com/api/v1/enableUser/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUsersList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserStatusChange = (userId, userStatus) => {
    if (userId && userStatus === "1") {
      disableUser(userId);
    } else {
      enableUser(userId);
    }
  };

  // Calculate users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="px-4 pt-6">
        <div className="p-4 backdrop-blur-sm bg-black/10 border border-secondary rounded-lg shadow-sm sm:p-6">
          <div className="items-center justify-between lg:flex">
            <div className="mb-4 lg:mb-0">
              <h3 className="mb-2 text-xl font-bold text-black">
                All Users
              </h3>
              <span className="text-base font-normal text-textColor">
                This is a list of all registered users
              </span>
            </div>
            <div className="items-center sm:flex">
              <div className="flex items-center">
                <button
                  onClick={() => setUsersModal(true)}
                  className="mb-4 sm:mb-0 mr-4 inline-flex items-center border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 bg-secondary text-black border-secondary hover:primary hover:border-primary focus:ring-primary"
                  type="button"
                >
                  Upload Users
                </button>
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
                          className="w-8 h-8 animate-spin text-gray-600 fill-blue-600"
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
                    <>
                      <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-primary">
                          <tr>
                            <th
                              scope="col"
                              className="p-2 text-xs font-medium tracking-wider text-left uppercase text-black"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-xs font-medium tracking-wider text-left uppercase text-black"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-xs font-medium tracking-wider text-left uppercase text-black"
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-xs font-medium tracking-wider text-left uppercase text-black"
                            >
                              Grade
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-xs font-medium tracking-wider text-left uppercase text-black"
                            >
                              Action(s)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800">
                          {currentUsers.map((user, index) => (
                            <tr
                              key={index}
                              className={user.disabled ? "opacity-50" : ""}
                            >
                              <td className="p-2 text-sm font-normal whitespace-nowrap text-black">
                                <span className="font-semibold">
                                  {user.name}
                                </span>
                              </td>
                              <td className="p-2 text-sm font-medium whitespace-nowrap text-black">
                                {user.email}
                              </td>
                              <td className="p-2 text-sm font-medium whitespace-nowrap text-black">
                                {user.referral_code}
                              </td>
                              <td className="p-2 text-sm font-medium whitespace-nowrap text-black">
                                {user.country_code}
                              </td>
                              <td className="p-2 text-sm font-medium whitespace-nowrap text-black">
                                <button
                                  onClick={() =>
                                    handleUserStatusChange(
                                      user.id,
                                      user.status
                                    )
                                  }
                                  className={`${
                                    user.status === "1"
                                      ? "mb-4 sm:mb-0 inline-flex items-center text-black bg-red-700 border border-red-700 focus:outline-none hover:bg-red-900"
                                      : "mb-4 sm:mb-0 inline-flex items-center text-black bg-green-700 border border-green-700 focus:outline-none hover:bg-green-900"
                                  }focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5`}
                                  type="button"
                                >
                                  {user.status === "1" ? "Disable" : "Enable"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4 py-2 text-sm font-medium text-black bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <span className="text-sm font-medium text-gray-700">
                          Page {currentPage} of{" "}
                          {Math.ceil(userList.length / usersPerPage)}
                        </span>
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={
                            currentPage ===
                            Math.ceil(userList.length / usersPerPage)
                          }
                          className="px-4 py-2 text-sm font-medium text-black bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {usersModal && <FileUpload closeModal={()=> setUsersModal(false)} />} */}
    </>
  );
};

export default UserList;

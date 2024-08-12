import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
const token = sessionStorage.getItem("token")

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOutstandingCommission, setTotalOutstandingCommission] =
    useState(0);
  const [totalNewMember, setTotalNewMember] = useState("0");
  const [totalSecondLevelReferrals, setTotalSecondLevelReferrals] =
    useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  useEffect(() => {
    getStatistics();
    getCommissionsStatistics();
  }, []);

  const getStatistics = async () => {
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
        "http://3.89.152.217/api/v1/count-total-registered-users",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setTotalUsers(result.total_users)
          console.log(result.total_users)})
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCommissionsStatistics = async () => {
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
        "http://3.89.152.217/api/v1/overall-total-oustanding-payments",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setTotalOutstandingCommission(result.total_outstanding_payment)})
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMemberStatistics = async () => {
    setIsLoading(true);
    try {
      
      const [newMemberResponse] = await Promise.all([
        axios.get("http://3.89.152.217/api/v1/users-registered-in-last-month"),
      ]);

      setTotalNewMember(newMemberResponse.data.total_new_member);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 pt-6">
      <div className="p-4 backdrop-blur-sm bg-white/10 border border-secondary rounded-lg shadow-sm sm:p-6">
        <div className="h-44 grid grid-cols-3 content-center">
          <div>
            <h3 className="text-lg font-bold text-gray-400 mb-3">
              Total No. Users
            </h3>
            <span className="text-3xl font-bold leading-none text-green-500 sm:text-5xl">
              {isLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin fill-green-600"
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
                ) : totalUsers}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold  text-gray-400 mb-2">
              New Users Last Month
            </h3>
            <span className="text-3xl font-bold leading-none text-green-500 sm:text-5xl ">
            {isLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin  fill-green-600"
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
                ) : totalSecondLevelReferrals}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

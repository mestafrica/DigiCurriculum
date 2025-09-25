import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AshtokenLoader from "./Ashtokenloader";
function EditProfile({ closeModel }) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    school: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const modelRef = useRef();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const refCloseFormModel = (e) => {
    if (modelRef.current === e.target) {
      closeModel();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.patch(
        "https://digicurriculum.onrender.com/update-user/68c2d63504c670a41f02403b",
        {
          firstName: form.firstname,
          lastName: form.lastname,
          school: form.school,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Profile updated:", res.data);
      alert("Update Successful!");
      setTimeout(() => closeModel(), 1000);
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://digicurriculum.onrender.com/update-user/68c2d63504c670a41f02403b",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setUserData(result);
        setForm({
          firstname: result.firstName || "",
          lastname: result.lastName || "",
          school: result.school || "",
        });

        // setForm({
        //   fullname: result.name,
        //   phone: result.phone,
        //   gender: result.gender,
        //   socialFb:
        //     "https://web.facebook.com/people/Shallum-Foundation/61550831559839/?mibextid=ZbWKwL",
        //   socialIg:
        //     "https://web.facebook.com/people/Shallum-Foundation/61550831559839/?mibextid=ZbWKwL",
        // });
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      ref={modelRef}
      onClick={refCloseFormModel}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-white"
    >
      <div className="w-full lg:w-2/3 p-4">
        <form onSubmit={updateProfile}>
          <div className="bg-white border border-secondary shadow-lg rounded-lg p-4">
            <div className="flex justify-between border-b pb-2">
              <h2 className="text-xl font-bold text-black ">Edit Profile</h2>
              <div className="flex">
                <button className="text-primary font-semibold">
                  User info
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-primary text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  name="firstname"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-primary text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  name="lastname"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="school"
                  className="block text-primary text-sm font-bold mb-2"
                >
                  School
                </label>
                <input
                  name="school"
                  type="text"
                  value={form.school}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              {!isLoading ? (
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              ) : (
                <AshtokenLoader />
              )}
              <button
                onClick={closeModel}
                className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import loader

function EditProfile({ closeModel }) {
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    gender: "",
    socialFb: "",
    socialIg: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const modelRef = useRef();
  const [userData, setUserData] = useState({});

  useEffect(()=> {
    getUserData()
  },[])

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

  const updadateProfile = async (event) => {
    event.preventDefault();
    const { fullname, phone, gender, socialFb, socialIg } = form;
    let data = new FormData();
    data.append("name", fullname);
    data.append("phone", phone);
    data.append("gender", gender);
    data.append("socials[fb]", socialFb);
    data.append("socials[ig]", socialIg);
    setIsLoading(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://3.89.152.217/api/v1/editProfile",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
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
        console.log(error);
        setIsLoading(false);
      });
  };

  const  getUserData = () => {
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
        setUserData(result);
        setForm({
          fullname: result.name,
          phone: result.phone,
          gender: result.gender,
          socialFb: "https://web.facebook.com/people/Shallum-Foundation/61550831559839/?mibextid=ZbWKwL",
          socialIg: "https://web.facebook.com/people/Shallum-Foundation/61550831559839/?mibextid=ZbWKwL",
        })
        console.log(result);
      })
      .catch((error) => console.error(error));
  }
  

 

  return (
    <div
      ref={modelRef}
      onClick={refCloseFormModel}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-white"
    >
      <div className="w-full lg:w-2/3 p-4">
        <form onSubmit={updadateProfile}>
        <div className="backdrop-blur-sm bg-white/10 border border-secondary shadow-lg rounded-lg p-4">
          <div className="flex justify-between border-b pb-2">
            <h2 className="text-xl font-bold text-textColor ">Edit Profile</h2>
            <div className="flex">
              <button className="text-primary font-semibold">User info</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-primary text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                name="fullname"
                type="text"
                id="fullname"
                defaultValue={userData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="phone" className="block text-primary text-sm font-bold mb-2">
                Phone
              </label>
              <input
                name="phone"
                type="text"
                id="phone"
                defaultValue={userData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="genderOptions"
                className="block text-primary text-sm font-bold mb-2"
              >
                Gender
              </label>
              <select
                name="gender"
                id="genderOptions"
                value={form.gender}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-700"
              >
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label htmlFor="facebook" className="block text-primary text-sm font-bold mb-2">
                  Facebook Username
                </label>
                <input
                  type="text"
                  id="facebook"
                  name="socialFb"
                  value={form.socialFb}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-primary text-sm font-bold mb-2">
                  Instagram Username
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="socialIg"
                  defaultValue={"Instagram"}
                  value={form.socialIg}
                  onChange={handleChange}
                  placeholder=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight  bg-gray-700"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            {!isLoading ? <button type="submit" className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded">
              Update
            </button> 
            : <AshtokenLoader />}
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

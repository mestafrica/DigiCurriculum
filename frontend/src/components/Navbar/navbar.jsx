import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgMenuRightAlt } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    userCases: false,
    resources: false,
  });
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userCasesRef = useRef(null);
  const resourcesRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userCasesRef.current && !userCasesRef.current.contains(event.target)) {
        setDropdownOpen((prev) => ({ ...prev, userCases: false }));
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setDropdownOpen((prev) => ({ ...prev, resources: false }));
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // load user state from localStorage
    const storedUserId = localStorage.getItem("userId");
    const storedUserType = localStorage.getItem("userType");
    const storedUserName = localStorage.getItem("userName") || localStorage.getItem("firstName") || null;
    const token = localStorage.getItem("token");

    if (storedUserId && token && storedUserType) {
      setUser({
        id: storedUserId,
        type: storedUserType,
        name: storedUserName,
      });
    } else {
      setUser(null);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen((s) => !s);

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    setUser(null);
    setUserMenuOpen(false);
    // navigate to signin page of frontend app
    navigate("/signin");
  };

  const handleDashboard = () => {
    // Navigate within the same app using React Router
    if (user?.type === "Teacher") {
      navigate("/teacher/dashboard");
    } else if (user?.type === "Student") {
      navigate("/dashboard");
    } else if (user?.type === "Admin") {
      navigate("/admin/dashboard");
    } else {
      // Fallback
      navigate("/dashboard");
    }
  };

  const getInitials = () => {
    const name = user?.name || "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="fixed bg-accent shadow-sm w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-primary font-bold text-3xl">
          LitmusTest
        </Link>

        <button
          id="menu-toggle"
          className="lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <CgMenuRightAlt />
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex flex-grow justify-center items-center">
          {/* <div className="relative" ref={userCasesRef}>
            <button
              onClick={() => toggleDropdown("userCases")}
              className="flex text-primary font-medium mx-4 focus:outline-none"
            >
              Category
              <RiArrowDropDownLine />
            </button>
            {dropdownOpen.userCases && (
              <div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <Link to="#" className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]">
                  Student
                </Link>
                <Link to="#" className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]">
                  Teacher
                </Link>
                <Link to="#" className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]">
                  School
                </Link>
              </div>
            )}
          </div> */}

          {/* <div className="relative" ref={resourcesRef}>
            <button
              onClick={() => toggleDropdown("resources")}
              className="flex text-primary font-medium mx-4 focus:outline-none"
            >
              Resources
              <RiArrowDropDownLine />
            </button>
            {dropdownOpen.resources && (
              <div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <Link to="#" className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]">
                  Curriculum
                </Link>
                <Link to="#" className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]">
                  Course Categories
                </Link>
                <Link to="#" className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]">
                  Question Bank
                </Link>
              </div>
            )}
          </div> */}

          <Link to="/about" className="text-primary font-medium mx-4">
            About Us
          </Link>
          <Link to="/assistant" className="text-primary font-medium mx-4">
            AI Assistant
          </Link>
            <Link to="/contact" className="text-primary font-medium mx-4">
            Contact
          </Link>
        </div>

        {/* Right side (desktop) */}
        <div className="hidden lg:flex items-center">
          <Link to="/signin" className="text-primary font-bold  mx-4">
            Login
          </Link>
          <Link to="/signup">
            <button className="bg-[#A9DEF9] text-secondary-foreground font-bold px-4 py-2 rounded-lg mx-4">
              Get Started - It's Free &gt;
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-primary mt-4">
          <div className="relative" ref={userCasesRef}>
            <button
              onClick={() => toggleDropdown("userCases")}
              className="flex text-primary-foreground font-medium mx-4 my-2 focus:outline-none"
            >
              Category
              <RiArrowDropDownLine />
            </button>
            {dropdownOpen.userCases && (
              <div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <Link to="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Student
                </Link>
                <Link to="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Teacher
                </Link>
                <Link to="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  School
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={resourcesRef}>
            <button
              onClick={() => toggleDropdown("resources")}
              className="flex text-primary-foreground font-medium mx-4 my-2 focus:outline-none"
            >
              Resources
              <RiArrowDropDownLine />
            </button>
            {dropdownOpen.resources && (
              <div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <Link to="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Curriculumn
                </Link>
                <Link to="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Course Categories
                </Link>
                <Link to="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Question Bank
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className="text-primary-foreground mx-4 my-2">
            About Us
          </Link>
          <Link to="/contact" className="text-primary-foreground mx-4 my-2">
          <Link to="/contact" className="text-primary-foreground mx-4 my-2">
            Contact
          </Link>
          <Link to="/assistant" className="text-primary-foreground mx-4 my-2">
            AI Assistant
          </Link>
          <Link to="/signin" className="text-primary-foreground mx-4 my-2">
            Login
          </Link>
          <Link to="/signup">
          <button className="bg-[#A9DEF9] text-secondary-foreground px-4 py-2 rounded-lg mx-4 my-2">
            Get Started - It's Free &gt;
          </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgMenuRightAlt } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    userCases: false,
    resources: false,
  });

  const userCasesRef = useRef(null);
  const resourcesRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleClickOutside = (event) => {
    if (userCasesRef.current && !userCasesRef.current.contains(event.target)) {
      setDropdownOpen((prev) => ({
        ...prev,
        userCases: false,
      }));
    }
    if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
      setDropdownOpen((prev) => ({
        ...prev,
        resources: false,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed bg-accent shadow-sm w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
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

        <div className="hidden lg:flex flex-grow justify-center items-center">
          <div className="relative" ref={userCasesRef}>
            <button
              onClick={() => toggleDropdown("userCases")}
              className="flex text-primary font-medium mx-4 focus:outline-none"
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
              className="flex text-primary font-medium mx-4 focus:outline-none"
            >
              Resources
              <RiArrowDropDownLine />
            </button>
            {dropdownOpen.resources && (
              <div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <Link to="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Curriculum
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

          <Link to="/about" className="text-primary font-medium mx-4">
            About Us
          </Link>
          <Link to="/contact" className="text-primary font-medium mx-4">
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex items-center">
          <Link to="/signin" className="text-primary font-bold  mx-4">
            Login
          </Link>
          <a href="https://gesdeveloper.netlify.app/">
          <button className="bg-[#A9DEF9] text-secondary-foreground font-bold px-4 py-2 rounded-lg mx-4">
            Get Started - It's Free &gt;
          </button>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
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

          <Link to="#" className="text-primary-foreground mx-4 my-2">
            About Us
          </Link>
          <Link to="#" className="text-primary-foreground mx-4 my-2">
            Contact
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

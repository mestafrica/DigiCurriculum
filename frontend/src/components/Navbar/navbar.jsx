import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgMenuRightAlt } from "react-icons/cg";

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
    <nav className="bg-transparent shadow-lg w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        <a href="#" className="text-primary font-bold text-3xl">
          LitmusTest
        </a>

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
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Student
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Teacher
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  School
                </a>
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
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Curriculum
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Course Categories
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Question Bank
                </a>
              </div>
            )}
          </div>

          <a href="#" className="text-primary font-medium mx-4">
            About Us
          </a>
          <a href="#" className="text-primary font-medium mx-4">
            Contact
          </a>
        </div>

        <div className="hidden lg:flex items-center">
          <a href="#" className="text-primary font-bold  mx-4">
            Login
          </a>
          <button className="bg-[#A9DEF9] text-secondary-foreground font-bold px-4 py-2 rounded-lg mx-4">
            Get Started - It's Free &gt;
          </button>
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
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Student
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Teacher
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  School
                </a>
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
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Curriculumn
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Course Categories
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-[#EAFAF4]"
                >
                  Question Bank
                </a>
              </div>
            )}
          </div>

          <a href="#" className="text-primary-foreground mx-4 my-2">
            About Us
          </a>
          <a href="#" className="text-primary-foreground mx-4 my-2">
            Contact
          </a>
          <a href="#" className="text-primary-foreground mx-4 my-2">
            Login
          </a>
          <button className="bg-[#A9DEF9] text-secondary-foreground px-4 py-2 rounded-lg mx-4 my-2">
            Get Started - It's Free &gt;
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

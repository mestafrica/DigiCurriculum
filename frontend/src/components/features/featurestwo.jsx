import React from "react";
import Image4 from "../../assets/images/image4.png";
import Image5 from "../../assets/images/image5.png";
import Request from "../../assets/images/request.png";
import Check from "../../assets/images/check.png";
import Bg2 from "../../assets/images/bg2.png";
import Talent from "../../assets/images/talent.png";

const FeaturesTwo = () => {
  return (
    <div>
      <div
        className="md:p-8 p-10 "
        style={{ backgroundImage: `url(${Bg2})`, backgroundSize: "cover" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 px-4 md:px-10 lg:px-16">
          <div className="p-6 md:p-8 lg:p-10 md:content-center">
            <div className="md:flex md:space-x-6 lg:space-x-12">
              <img
                className="size-full md:w-1/2 p-4 md:p-2"
                src={Talent}
                alt="Talent"
              />
              <img className="size-full md:w-1/2 p-4" src={Image4} alt="Image 4" />
            </div>
            <div className="flex justify-center p-6  mt-6 md:mt-8">
              <img className="w-full md:w-2/3" src={Check} alt="Check" />
            </div>
            <div className="mt-8 md:mt-12 flex items-center justify-between">
              <img className="size-1/3" src={Image5} alt="Image 5" />
              <img className="size-1/2" src={Request} alt="Request" />
            </div>
          </div>
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
              Litmus Test - For Teachers
            </h2>
            <p className="text-gray-700 mt-4 md:mt-6">
              Litmus Test streamlines classroom administration and enhances the
              teaching experience by providing more time for what truly matters
              – teaching and dedicated student support. The result is an
              empowered and more efficient teaching workforce.
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 md:mt-6">
              <li>
                Classroom Administration: No paperwork, just simple clicks.
              </li>
              <li>
                Lesson Planning: Your personalized engaging lesson plans
                quickly.
              </li>
              <li>
                Professional Development: Access updated training resources.
              </li>
              <li>
                Student Tracking: The most reliable and accurate record-keeping.
              </li>
              <li>
                Collaborative Community: Join a supportive community of
                educators.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesTwo;

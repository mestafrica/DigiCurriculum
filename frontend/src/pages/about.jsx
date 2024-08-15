import React from "react";
import Underline from "../assets/images/underline.png";
import Photo1 from "../assets/images/photo1.png";
import Photo2 from "../assets/images/photo2.png";
import Photo3 from "../assets/images/photo3.png";
import Content1 from "../assets/images/content1.png";
import Content2 from "../assets/images/content2.png";
import Frame1 from "../assets/images/frame1.png";
import Frame2 from "../assets/images/frame2.png";
import Frame3 from "../assets/images/frame3.png";

export default function About() {
  return (
    <div className="p-4">
      <div
        className="md:h-screen"
        style={{
          backgroundImage: "url(about.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center py-44">
          <h1 className="text-6xl text-white font-bold font-serif">About Us</h1>
          <p className="text-white text-lg font-semibold md:w-2/4 p-10 pt-10">
            Our online curriculum offers dynamic and interactive lessons for
            students. We ensure that learning is enjoyable and meaningful,
            inspiring students to explore and think critically beyond the
            traditional classroom environment.
          </p>
          <button className="text-black font-semibold bg-yellow-300 rounded-xl p-2 px-6">
            See More
          </button>
        </div>
      </div>

      <div
        className=""
        style={{ backgroundImage: "url(backg.png)", backgroundSize: "cover" }}
      >
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl md:text-4xl font-serif py-6 p-6">
            Preparing Students to Achieve Success
          </h2>
          <img src={Underline} />
        </div>
        <div className="flex flex-col justify-center md:flex-row md:mt-14 md:gap-24">
          <img className="w-64 md:w-96 ml-10" src={Photo1} />
          <img className="p-6" src={Content1} />
        </div>
        <div className="flex flex-col justify-center md:flex-row md:mt-24 md:gap-24">
          <img className="ml-10" src={Content2} />
          <img className="p-6 w-72 ml-10 md:w-96" src={Photo2} />
        </div>
        <div className="flex flex-col justify-center md:flex-row md:mt-24 md:gap-24">
          <img className="w-64 md:w-96 ml-10" src={Photo3} />
          <img className="p-6" src={Content1} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-semibold font-serif text-xl md:text-4xl py-4 md:mt-12">
            Why It Works
          </h2>
          <img src={Underline} />
        </div>
        <div className="flex md:flex-row flex-col justify-center gap-10 m-12 md:m-24">
          <img src={Frame1} />
          <img src={Frame2} />
          <img src={Frame3} />
        </div>
      </div>
    </div>
  );
}

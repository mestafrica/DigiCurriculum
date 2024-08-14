import bgImage from "../../../assets/images/b.g.png";
import partnersImage from "../../../assets/images/mestm 1.png"; 
import catalystLogo from "../../../assets/images/catalyst logo.png"; 

function Hero() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8 lg:px-12"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy-900 text-center mb-4">
          AI-powered Assistance for <br className="hidden sm:block" />
          educators and learners.
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center mb-8 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          Equip your students, educators, and institution with dynamic tools that drive ongoing <br className="hidden md:inline" />
          development and inspire enduring enthusiasm for learning and teaching.
        </p>
        <button
          type="submit"
          className="bg-blue-300 text-black font-bold py-2 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-6 lg:py-4 lg:px-8 rounded-lg focus:outline-none focus:shadow-outline transition transform hover:scale-105"
        >
          Experience the change now &gt;
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-8 px-4 sm:px-6 md:px-8 lg:px-12">
        <p className="text-base sm:text-lg md:text-xl font-bold mb-4 md:mb-0 md:mr-6 text-center md:text-left">
          We're backed by
        </p>
        <div className="flex justify-center items-center">
          <img src={partnersImage} alt="Partners" className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 mr-4" />
          <img src={catalystLogo} alt="Catalyst Logo" className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6" />
        </div>
      </div>
    </>
  );
}

export default Hero;

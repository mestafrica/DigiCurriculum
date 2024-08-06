import bgImage from "../../../assets/images/b.g.png";
import partnersImage from "../../../assets/images/mestm 1.png"; 

function Hero() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 md:px-8"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 text-center mb-4">
          AI-powered Assistance for <br />
          educators and learners.
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-center mb-8 max-w-4xl mx-auto">
          Equip your students, educators, and institution with dynamic tools that drive ongoing <br className="hidden md:inline" /> development and inspire enduring enthusiasm for learning and teaching.
        </p>
        <button
          type="submit"
          className="bg-blue-300 text-black font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg focus:outline-none focus:shadow-outline transition transform hover:scale-105"
        >
          Experience the change now &gt;
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 px-4 md:px-8">
        <p className="text-lg font-bold mb-4 md:mb-0 md:mr-6 text-center md:text-left">We're backed by</p>
        <img src={partnersImage} alt="Partners" className="max-w-xs md:max-w-sm lg:max-w-md" />
      </div>
    </>
  );
}

export default Hero;

import bgImage from "../../../assets/images/b.g.png";
import partnersImage from "../../../assets/images/mestm 1.png"; 

function Hero() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-4xl font-bold text-navy-900 text-center mb-4">
          AI-powered Assistance for <br />
          educators and learners.
        </h1>
        <p className="text-lg text-center mb-8">
          Equip your students, educators, and institution with dynamic tools that drive ongoing <br /> development and inspire enduring enthusiasm for learning and teaching.
        </p>
        <button
          type="submit"
          className="bg-blue-300 text-black font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Experience the change now &gt;
        </button>
      </div>
      
      <div className="flex justify-center items-center mt-8">
        <p className="text-lg font-bold mr-6">We're backed by</p>
        <img src={partnersImage} alt="Partners" className="max-w-xs" />
      </div>
    </>
  );
}

export default Hero;

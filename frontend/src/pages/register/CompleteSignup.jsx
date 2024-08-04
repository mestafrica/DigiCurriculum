
import bgImage from '../../assets/images/b.g.png';

function CompleteSignup() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        
        <p className="mb-4">Email has been sent to star@gmail.com. Kindly use it to complete your registration.</p>
        <div className="flex justify-center mb-4">
          <input type="text" maxLength="1" className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1" />
          <input type="text" maxLength="1" className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1" />
          <input type="text" maxLength="1" className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1" />
          <input type="text" maxLength="1" className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1" />
        </div>
        <button className=" bg-buttonBg text-white py-2 px-4 rounded-lg focus:outline-none">
          Complete Registration
        </button>
        <p className="mt-4">
          Did not receive OTP? <a href="#" className="text-blue-500">resend</a>
        </p>
      </div>
    </div>
  );
}

export default CompleteSignup;

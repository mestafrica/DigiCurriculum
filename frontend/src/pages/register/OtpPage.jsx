import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import bgImage from '../../assets/images/b.g.png';

function CompleteSignup() {
  const navigate = useNavigate();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompleteRegistration = () => {
    navigate('/signin');
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 0) {
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.length) {
        inputRefs[nextIndex].current.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('OTP has been resent to your email.');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <p className="mb-4">Email has been sent to star@gmail.com. Kindly use it to complete your registration.</p>
        <div className="flex justify-center mb-4">
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="border border-gray-300 rounded-md w-12 h-12 text-center mx-1"
              ref={ref}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        <button
          className="bg-buttonBg text-white py-2 px-4 rounded-lg focus:outline-none"
          onClick={handleCompleteRegistration}
        >
          Complete Registration
        </button>
        <p className="mt-4">
          {loading ? (
            <span className="text-blue-500">Resending OTP...</span>
          ) : (
            <>
              Did not receive OTP?{' '}
              <a href="#" className="text-blue-500" onClick={handleResendOtp}>
                resend
              </a>
            </>
          )}
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default CompleteSignup;

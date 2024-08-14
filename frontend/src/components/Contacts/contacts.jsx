import React, { useState } from "react";
import bgFrame from "../../assets/images/Frame5.png"
import bgFrame2 from "../../assets/images/Frame1.png"

const ContactForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    subject: "",
    message: "",
  });

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Replace with your API endpoint
      const response = await fetch("https://your-api-endpoint.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:min-h-screen md:max-h-screen grid grid-cols-1 md:grid-cols-3 lg:px-32 lg:py-32 md:p-10 bg-cover bg-center"
    style={{ backgroundImage: `url(${bgFrame})` }}>
     <div className="md:col-span-1 bg-cover shadow-md" style={{ backgroundImage: `url(${bgFrame2})` }}>
     <div className=" p-8 md:p-6">
      <div className="pt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Contact Information
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Want more Info? We are a dial away!
        </p>
        </div>
        <div className="flex items-center mb-4 mt-10 pt-10">
          <span className="mr-2">📞</span>
          <span className="text-muted-foreground">+233 000 0009</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="mr-2">✉️</span>
          <span className="text-muted-foreground">litest@gmail.com</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="mr-2">📍</span>
          <span className="text-muted-foreground">
            132 Video Street Accra, Greater-Accra 00233 Ghana
          </span>
        </div>
        <div className="flex space-x-4 mt-6 pt-10">
          <a href="#" className="text-muted-foreground hover:text-primary">
            Twitter
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            Instagram
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            Discord
          </a>
        </div>
      </div>
      </div>
      <div className="md:col-span-2">
        <form
          className="bg-card p-4 md:p-6 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-muted-foreground"
              htmlFor="first-name"
            >
              First Name
            </label>
            <input
              className="mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-muted-foreground"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <input
              className="mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-muted-foreground"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="mt-1 block w-full border border-border rounded-md p-2"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 012 3456 789"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground">
              Select Subject
            </label>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="subject"
                  value="general"
                  checked={formData.subject === "general"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                General Inquiry
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="subject"
                  value="course"
                  checked={formData.subject === "course"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Course Inquiry
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="subject"
                  value="schools"
                  checked={formData.subject === "schools"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Schools Inquiry
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="subject"
                  value="curriculum"
                  checked={formData.subject === "curriculum"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Curriculum Inquiry
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-muted-foreground"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="mt-1 block w-full border border-border rounded-md p-2"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message.."
              required
            ></textarea>
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      </div>
  );
};

export default ContactForm;

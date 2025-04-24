import { useState } from "react";
import { X } from "lucide-react";
import "./style.scss"

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    size: "",
    solutions: [],
    volume: "",
    message: "",
    contactMethod: "Email",
    bestTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      solutions: checked
        ? [...prev.solutions, value]
        : prev.solutions.filter((s) => s !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Add your form submission logic here (e.g. API call)
    setOpen(false); // close modal after submission
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="px-8 py-3 bg-white text-[#807045] font-semibold rounded-full shadow-md hover:bg-[#5c5132] hover:text-white transition-all">
        Get in Touch
      </button>

      {open && (
        <div
          className="printing-contact w-screen h-screen fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center md:p-20 text-[black]"
          onClick={() => setOpen(false)} // Close on backdrop click
        >
          <div
            className="brown-bg-gradient rounded-2xl shadow-lg relative overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
          >
            <div className="h-[98vh] md:h-[90vh] w-[95vw] md:w-[70vw] overflow-y-auto p-6 relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-black text-[whitesmoke] rounded-full p-2"
              >
                <X size={24} />
              </button>

              <h2 className="md:px-20 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[white] to-[whitesmoke] bg-clip-text text-transparent text-center mt-10 mb-14">
                Get Tailored IT Solutions
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                <div className="flex flex-col gap-10 md:gap-4">
                  <div className="flex flex-col md:flex-row gap-10 md:gap-10">
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Name</label>
                      <input name="fullName" type="text" required placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Email</label>
                      <input name="email" type="email" required placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Phone Number</label>
                      <input name="phone" type="tel" placeholder="+260" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>
                    
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Company Name</label>
                      <input name="company" type="text" required placeholder="e.g Gradle Holdings" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Industry</label>
                      <select name="industry" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                        <option value="">Select Industry</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Education">Education</option>
                        <option value="Government">Government</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Company Size</label>
                      <select name="size" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                        <option value="1–10">1–10</option>
                        <option value="11–50">11–50</option>
                        <option value="51–200">51–200</option>
                        <option value="201–500">201–500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                  </div>
                  
                </div>

                <fieldset className="space-y-2 flex-center text-white">
                  <legend className="font-semibold text-3xl pt-10">Services of Interest</legend>
                  <div className="flex md:justify-center flex-wrap md:space-x-5 gap-5 py-5">
                    {[
                      "Hardware & Infrastructure",
                      "System & Platform Development",
                      "IT Consulting & Managed Services",
                      "Not sure yet – please advise",
                    ].map((solution) => (
                      <label key={solution} className="flex items-center w-fit">
                        <input
                          type="checkbox"
                          value={solution}
                          onChange={handleCheckbox}
                          className="mr-2 w-6 h-6"
                        />
                        {solution}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Brief Description of Your Needs (Optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />

                <div className="flex-center py-5">
                  <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition w-fit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
          className="printing-contact w-screen h-screen fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center md:p-20 text-[black]"
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

              <h2 className="md:px-10 text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[white] to-[whitesmoke] bg-clip-text text-transparent text-center mt-10 mb-14">
                Tell Us About Your Business Needs
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                <div className="flex flex-col gap-10 md:gap-4">
                  <div className="flex flex-col md:flex-row gap-10 md:gap-10">
                    <input name="fullName" type="text" required placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                    <input name="phone" type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    <input name="company" type="text" required placeholder="Company Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                    <select name="industry" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                      <option value="">Select Industry</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Education">Education</option>
                      <option value="Government">Government</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Other">Other</option>
                    </select>
                    
                    <select name="size" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                      <option value="">Company Size</option>
                      <option value="1–10">1–10</option>
                      <option value="11–50">11–50</option>
                      <option value="51–200">51–200</option>
                      <option value="201–500">201–500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>

                <fieldset className="space-y-2 flex-center text-white">
                  <legend className="font-semibold text-3xl pt-10">Services of Interest</legend>
                  <div className="flex md:justify-center flex-wrap md:space-x-5 gap-5 py-5">
                    {[
                      "SIM Registration & Management",
                      "Mobile Money Services",
                      "Quality Assurance",
                      "Customer Support Services",
                      "Back Office Support",
                      "Risk & Compliance Management"
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
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />

                <div className="flex flex-col md:flex-row gap-10 pb-5">
                  <select name="volume" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                    <option value="">Estimated Monthly Workload</option>
                    <option value="Under 1,000 tasks/transactions">Under 1,000 tasks/transactions</option>
                    <option value="1,000–10,000">1,000–10,000</option>
                    <option value="10,000–50,000">10,000–50,000</option>
                    <option value="50,000+">50,000+</option>
                  </select>
                  
                  <select name="bestTime" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                    <option value="">Best Time to Contact</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>

                  <select name="bestTime" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                    <option value="">Preferred Contact Method</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>

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

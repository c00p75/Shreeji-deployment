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
          Get Started
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

              <h2 className="md:px-10 pb-5 text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[white] to-[whitesmoke] bg-clip-text text-transparent text-center mt-10 mb-10">
                Let’s Lift Your Project to New Heights
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
                      <label className="text-white font-semibold mb-2">Select Industry</label>
                      <select name="industry" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Construction">Construction</option>
                        <option value="Oil & Gas">Oil & Gas</option>
                        <option value="Logistics & Transportation">Logistics & Transportation</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Renewable Energy">Renewable Energy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Project Location (City/Region)</label>
                      <input name="location" type="text" required placeholder="e.g. Rhodes Park, Lusaka" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-10 pt-5">
                  <div className="flex flex-col w-full text-start mt-2">
                    <label className="text-white font-semibold mb-2">Type of Project</label>
                    <input name="project" type="text" placeholder="e.g. 'High-rise construction', 'Bridge installation'" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                  </div>

                  <div className="flex flex-col w-full text-start mt-2">
                    <label className="text-white font-semibold mb-2">Expected Project Start Date</label>
                    <input name="project" type="date" placeholder="e.g. 'High-rise construction', 'Bridge installation'" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                  </div>

                  <div className="flex flex-col w-full text-start mt-2">
                    <label className="text-white font-semibold mb-2">Estimated Project Duration</label>
                    <select name="volume" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                      <option value="Less than 1 month">Less than 1 month</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="Over 6 months">Over 6 months</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-10 pb-5">
                  <div className="flex flex-col w-full text-start mt-2">
                    <label className="text-white font-semibold mb-2">Load Type & Estimated Weight</label>
                    <input name="project" type="text" placeholder="e.g, Steel beams, aprx. 20 tons" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                  </div>                  
                  
                  <div className="flex flex-col w-full text-start mt-2">
                    <label className="text-white font-semibold mb-2">Best Time to Contact</label>
                    <select name="bestTime" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div> 

                  <div className="flex flex-col w-full text-start mt-2">
                    <label className="text-white font-semibold mb-2">Preferred Contact Method</label>
                    <select name="bestTime" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="WhatsApp">WhatsApp</option>
                    </select>
                  </div>
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

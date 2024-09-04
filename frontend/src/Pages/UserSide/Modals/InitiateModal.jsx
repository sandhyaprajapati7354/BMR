import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const InitiateModal = ({ approvedBMR, onClose }) => {
  const [selectedBMR, setSelectedBMR] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleOpenRecordModal = (item) => {
    setSelectedBMR(item);
    navigate("/bmr_records", { state: { selectedBMR: item } });
  };

  const filteredBMR = approvedBMR.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl h-[90vh] overflow-hidden ">
        {" "}
        <div className="flex justify-center  items-center p-5 bg-gradient-to-r from-blue-600 to-blue-800">
          <h2 className="text-2xl font-bold text-white">Initiate BMR Record</h2>
          <button
            className="text-white text-2xl hover:bg-blue-700 rounded-full p-2 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4 ">
          <div className="mb-4 relative flex gap-10  w-full">
            {" "}
            <input
              type="text"
              placeholder="Search BMR Records..."
              className="w-[100%] p-3 pl-10 rounded-lg "
              style={{ paddingTop: "5px", boxShadow: "0px 0px 6px gray" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
           
          </div>
          <div className="space-y-3 max-h-100 overflow-y-auto ">
            {filteredBMR.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white hover:bg-blue-100 rounded-md shadow-lg"
              >
                <button
                  className="text-gray-800 font-thin hover:font-extrabold cursor-pointer"
                  onClick={() => handleOpenRecordModal(item)}
                >
                  • {item.name}
                </button>
              </div>
            ))}
            {filteredBMR.length === 0 && (
              <p className="text-center text-gray-500">No records found.</p>
            )}
          </div>
        </div>
        <div className="flex justify-end p-4 sticky border-t">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-1000 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitiateModal;

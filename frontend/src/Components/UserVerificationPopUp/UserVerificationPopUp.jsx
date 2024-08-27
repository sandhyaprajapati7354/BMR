import { useState } from "react";
import "./UserVerificationPopUp.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserVerificationPopUp = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [declaration, setDeclaration] = useState("");
  const navigate = useNavigate(); // Corrected to lowercase 'navigate'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      declaration: declaration,
    };

    try {
      const response = await axios.post(
        "http://195.35.6.197:7000/user/user-verification", // Corrected URL
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Successfully Initiated");

      const token = response.data.token;
      localStorage.setItem("user-token", token);

      const decoded = jwtDecode(token);
      localStorage.setItem("user-details", JSON.stringify(decoded));

      navigate("/process/bmr_process"); // Corrected to lowercase 'navigate'
      console.log("success");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="popup-overlay z-50">
      <div className="popup">
        <h2>E-signature</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="color-label">
              Email <span className="required-asterisk text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="color-label">
              Password <span className="required-asterisk text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="color-label">
              Declaration{" "}
              <span className="required-asterisk text-red-500">*</span>
            </label>
            <input
              type="text" // Changed to 'text' for proper input handling
              value={declaration}
              onChange={(e) => setDeclaration(e.target.value)}
              required
            />
          </div>
          <div className="popup-buttons">
            <button type="submit" className="btn">
              Submit
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserVerificationPopUp;

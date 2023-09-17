import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, onUserSignUp }) => {
  const [basicInputs, setBasicInputs] = useState({
    name: "",
    email: "",
    spoc: "",
    phone: "",
  });

  const handleBasicInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBasicInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetModal = () => {
    setBasicInputs({
      name: "",
      email: "",
      spoc: "",
      phone: "",
    });
  };

  const handleUserSignUp = (e) => {
    e.preventDefault();
    if (basicInputs !== null)
      onUserSignUp({
        name: basicInputs.name,
        email: basicInputs.email,
        spoc: basicInputs.spoc,
        phone: basicInputs.phone,
      });
    resetModal();
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <h2>Create new contact</h2>

            <div>
              <form onSubmit={handleUserSignUp}>
                <div className="formGroup">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={basicInputs.name}
                    onChange={handleBasicInputChange}
                    required
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={basicInputs.email}
                    onChange={handleBasicInputChange}
                    required
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="spoc">Spoc:</label>
                  <input
                    type="text"
                    id="spoc"
                    name="spoc"
                    value={basicInputs.spoc}
                    onChange={handleBasicInputChange}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={basicInputs.phone}
                    onChange={handleBasicInputChange}
                    required
                  />
                </div>
                <button type="submit" className="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

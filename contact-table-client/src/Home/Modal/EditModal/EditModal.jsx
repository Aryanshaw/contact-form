import React, { useEffect, useState } from "react";

const EditModal = ({ isOpen, onClose, row, onUpdate }) => {
  const [editRowValue, setEditRowValue] = useState({
    name: "",
    email: "",
    spoc: "",
    phone: "",
  });

  // Update the component state if the row prop changes
  useEffect(() => {
    if (row) {
      setEditRowValue(row);
    }
  }, [row]);

  const handleRowEdit = (e) => {
    const { name, value } = e.target;
    setEditRowValue({ ...editRowValue, [name]: value });
  };

  const handleUserEdit = () => {
    onUpdate({
      name: editRowValue.name,
      email: editRowValue.email,
      spoc: editRowValue.spoc,
      phone: editRowValue.phone,
    });
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <h2>Edit contact</h2>

            <div>
              <form>
                <div className="formGroup">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editRowValue.name || ""}
                    onChange={handleRowEdit}
                    required
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editRowValue.email || ""}
                    onChange={handleRowEdit}
                    required
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="spoc">Spoc:</label>
                  <input
                    type="text"
                    id="spoc"
                    name="spoc"
                    value={editRowValue.spoc || ""}
                    onChange={handleRowEdit}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={editRowValue.phone || ""}
                    onChange={handleRowEdit}
                    required
                  />
                </div>
              </form>

              <button onClick={handleUserEdit} className="submit">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;

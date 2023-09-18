import React, { useState, useEffect } from "react";
import { TableContainer, Paper } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import "./ContactTable.css";
import Modal from "../Modal/Modal";
import {
  FaPlus,
  FaEdit,
  FaFileExport,
  FaWhatsapp,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { AiFillDelete, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import EditModal from "../Modal/EditModal/EditModal";

const ContactTable = () => {
  const [contactData, setContactData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [submitContact, setSubmitContact] = useState(false);
  const [editContact, seteditContact] = useState(null);
  const [selectedRow, setselectedRow] = useState([]);
  const [selectedRowId, setselectedRowId] = useState("");
  const [deletedRow, setdeletedRow] = useState("");
  const [selectedCheckBox, setselectedCheckBox] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search query changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the data based on the search query
  const filteredData = contactData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditUserModal = (row) => {
    setselectedRow(row);
    setselectedRowId(row._id);
    setisEditModalOpen(true);
  };

  const closeEditModal = () => {
    setisEditModalOpen(false);
  };

  // get the table datas from the api
  const fetchDataTableInfo = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get("/contacts/getAllContacts");
      setContactData(result.data);
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  //call the fetchDataTableInfo function
  useEffect(() => {
    fetchDataTableInfo();
  }, [userInfo]);

  //add new contact function
  const addNewContactHandler = async (userData) => {
    setUserInfo(userData);
    setIsLoading(true);
    try {
      const result = await axios.post("/contacts/addNewContact", userData);
      console.log(result.data);
      setSubmitContact(true);
      fetchDataTableInfo();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    closeModal();
  };

  //update a particular contact
  const updateContactHandler = async (updateNewContact) => {
    seteditContact(updateNewContact);
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/contacts/updateContact/${selectedRowId}`,
        updateNewContact
      );
      console.log(response);
      fetchDataTableInfo();
    } catch (err) {
      console.log(err, "error updating contact");
    }
    setIsLoading(false);
    closeEditModal();
  };

  //delete a particular contact
  const deleteContactHandler = async (id) => {
    setIsLoading(true);
    try {
      const resp = await axios.delete(`/contacts/deleteContact/${id}`);
      console.log(resp);
      setdeletedRow(id);
      fetchDataTableInfo();
    } catch (err) {
      console.log(err, "error in deleteing");
    }
    setIsLoading(false);
  };

  const deleteAllContactsHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete("/contacts/deleteAllContacts");
      console.log(res);
      fetchDataTableInfo();
    } catch (err) {
      console.log(err, "in deleting all contacts");
    }
    setIsLoading(false);
  };

  // call the addContact function and fetch the table again
  useEffect(() => {
    if (submitContact) {
      addNewContactHandler();
      fetchDataTableInfo();
    }
  }, [submitContact]);

  //define the columns of the row
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 130,
    },
    {
      field: "cts",
      headerName: "cts",
      width: 200,
      renderCell: () => (
        <div style={{ gap: "20px", display: "flex" }}>
          <FaWhatsapp size={20} />
          <BiPhoneCall size={20} />
          <FaEnvelopeOpenText size={20} />
          <AiOutlineMail size={20} />
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "spoc",
      headerName: "spoc",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 130,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: false,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ flexDirection: "row", display: "flex", gap: "30px" }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleEditUserModal(params.row)}
            >
              <FaEdit index={params.row._id} size={20} />
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => deleteContactHandler(params.row._id)}
            >
              <AiFillDelete index={params.row._id} size={20} />
            </div>
          </div>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="container">
      {isSuccess || isLoading === false ? (
        <div className="table">
          <TableContainer component={Paper}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "30px",
                paddingRight: "70px",
              }}
            >
              <h3>Contact Table</h3>
              <div>
                {selectedCheckBox === contactData.length &&
                  selectedCheckBox > 0 && (
                    <button
                      onClick={deleteAllContactsHandler}
                      style={{
                        height: "30px",
                        marginRight: "10px",
                        backgroundColor: "red",
                        color: "white",
                        borderStyle: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Delete Selected Rows
                    </button>
                  )}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search by name or email"
                  style={{
                    height: "15px",
                    marginRight: "10px",
                    padding: "10px",
                  }}
                />
                <span className="addNewContactContainer" onClick={openModal}>
                  <FaPlus />
                </span>
              </div>
            </div>
            <div className="datagrid">
              <DataGrid
                rows={filteredData}
                columns={columns}
                slots={{ toolbar: CustomToolbar }}
                getRowId={(contactData) => contactData._id}
                checkboxSelection
                pageSizeOptions={[5]}
                hideFooterPagination={true}
                loading={isLoading}
                disableRowSelectionOnClick
                onRowSelectionModelChange={(ids) => {
                  setselectedCheckBox(ids.length);
                }}
              />
            </div>
          </TableContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUserSignUp={addNewContactHandler}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdate={updateContactHandler}
        row={selectedRow}
      />
    </div>
  );
};

export default ContactTable;

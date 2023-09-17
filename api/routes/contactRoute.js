import express from "express";
import {
  addNewContact,
  deleteAllContacts,
  deleteContactUser,
  getAllContacts,
  getContactById,
  updateContact,
} from "../controllers/contactFormRequest.js";

const router = express.Router();

router.post("/addNewContact", addNewContact);
router.get("/getAllContacts", getAllContacts);
router.get("/getContactById/:id", getContactById);
router.put("/updateContact/:id", updateContact);
router.delete("/deleteContact/:id", deleteContactUser);
router.delete("/deleteAllContacts", deleteAllContacts);

export default router;

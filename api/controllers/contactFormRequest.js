import express from "express";
import contactSchema from "../models/contactSchema.js";

export const addNewContact = async (req, res, next) => {
  try {
    const newContact = new contactSchema({
      name: req.body.name,
      email: req.body.email,
      spoc: req.body.spoc,
      phone: req.body.phone,
    });
    await newContact.save();
    await res.status(200).send({ message: "Contact saved successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await contactSchema.find();
    res.status(200).send(allContacts);
  } catch (err) {
    res.status(500).json("Error in getting all contacts");
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleContact = await contactSchema.findById(id);
    if (!singleContact) {
      res.status(401).json("No such record found");
    } else {
      res.status(200).send(singleContact);
    }
  } catch (err) {
    res.status(500).json("Error in getting a contact");
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateContactUser = await contactSchema.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    await updateContactUser.save();
    res.status(200).send({ message: "updated the Contact" });
  } catch (err) {
    res.status(500).json("Error in updating");
  }
};

export const deleteContactUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await contactSchema.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(409).json("no user with this ID");
    } else {
      return res.status(200).send({ message: "deleted user" });
    }
  } catch (err) {
    res.status(500).json("error in deleting");
  }
};

// Delete all users

export const deleteAllContacts = async (req, res, next) => {
  try {
    const result = await contactSchema.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(409).json({ message: "No users to delete" });
    } else {
      return res
        .status(200)
        .json({ message: "All users deleted successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in deleting users", error: err.message });
  }
};

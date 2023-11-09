const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route Get /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const constacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(constacts);
});

//@desc Get specific contact
//@route Get /api/contact/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }  
  res.status(200).json(contact);
});

//@desc Create contact
//@route Post /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is : ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All field are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc Update contact
//@route Put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  } 
  
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc Get all contacts
//@route GEt /api/contacts
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  } 
  await Contact.deleteOne({ _id: req.params.id});
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

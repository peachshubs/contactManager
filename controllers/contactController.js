const asyncHandler=require("express-async-handler"); 
const Contact= require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContact = asyncHandler(async(req, res) => {
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});




// @desc Get single contact
// @route GET /api/contacts/:id
// @access private
const getContactByID = asyncHandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const putContact = asyncHandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User does not have permission for this action.");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body,
        {new: true}
    );
    res.status(201).json(updatedContact);
});

// @desc Create contact
// @route POST /api/contacts/
// @access private
const postContact = asyncHandler(async(req, res) => {
    console.log("The request body is:",req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const contact=await Contact.create({
        name, email, phone,user_id:req.user.id
    });
    res.status(201).json(contact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User does not have permission for this action.");
    }
    await Contact.deleteOne();
    res.status(200).json(contact);
});

module.exports = {
    getContact,
    getContactByID,
    putContact,
    postContact,
    deleteContact
};

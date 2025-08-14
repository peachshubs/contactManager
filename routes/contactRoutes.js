const express= require("express");
const router=express.Router();
const {
    getContact,
    putContact,
    postContact,
    deleteContact,
    getContactByID
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");


router.use(validateToken);

// http commands (get,put,post,delete)
// specify id in the path for thunder client i.e api/contacts/x
router.route('/')
    .get(getContact)
    .post(postContact);

router.route('/:id')
    .get(getContactByID)
    .put(putContact)
    .delete(deleteContact);
// exporting router
module.exports=router;

const Contact = require('../models/contact');

const {HttpError, ctrlWrapper} = require('../helpers/');


 const getAllContacts = async (req, res) => {

      const result = await Contact.find();
      res.json(result);
  };


   const getContactById = async (req, res) => {
         const {contactId} = req.params;
         const result = await Contact.findById(contactId);
         if (!result) {
  
           throw HttpError(404, "Not Found");
         }
  
         res.json(result);
   };



   const addNewContact = async (req, res) => {
      const {name, email, phone, favorite, birthday} = req.body;
       const result = await Contact.create({name, email, phone, favorite, birthday})
       console.log(result);
       res.status(201).json(result);
   };
 

   const deleteContactById =  async (req, res) => {
       const {contactId} = req.params;
       const result = await Contact.findByIdAndRemove(contactId);
       if (!result) {
         throw HttpError(404, "Not Found");
       }
       res.json({
         message: 'Delete success'
       })
  
   };

   const updateContactById = async (req, res) => {
        const {contactId} = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
         if (!result) {
         throw HttpError(404, "Not Found");
      }
       res.json(result);
   };

   const updateStatusContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
     if (!result) {
     throw HttpError(404, "Not Found");
  }
   res.json(result);
};


  module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addNewContact: ctrlWrapper(addNewContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
  };

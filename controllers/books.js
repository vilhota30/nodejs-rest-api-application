const dataContactOperation = require('../models/contacts');

const {HttpError, ctrlWrapper} = require('../helpers/');

//  const Joi = require('joi');

//  const addSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     phone: Joi.string().required(),
//  });


 const getAllContacts = async (req, res) => {

      const result = await dataContactOperation.listContacts();
      res.json(result);
  };


  const getContactById = async (req, res) => {
        const {contactId} = req.params;
        const result = await dataContactOperation.getContactById(contactId);
        if (!result) {
  
          throw HttpError(404, "Not Found");
        }
  
        res.json(result);
  };



  const addNewContact = async (req, res) => {
      const {name, email, phone} = req.body;
      const result = await dataContactOperation.addContact(name, email, phone);
      res.status(201).json(result);
  };
 

  const deleteContactById =  async (req, res) => {
      const {contactId} = req.params;
      const result = await dataContactOperation.removeContact(contactId);
      if (!result) {
        throw HttpError(404, "Not Found");
      }
      res.json({
        message: 'Delete success'
      })
  
  };

  const updateContactById = async (req, res) => {
       const {contactId} = req.params;
       const result = await dataContactOperation.updateContact(contactId, req.body);
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
  }
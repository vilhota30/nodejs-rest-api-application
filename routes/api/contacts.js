const express = require('express');

const dataContactOperation = require('../api/../../models/contacts');

const {HttpError} = require('../../helpers');

 const Joi = require('joi');

const router = express.Router();

 const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
 });

router.get('/', async (req, res, next) => {

  try {
    const result = await dataContactOperation.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }

});


router.get('/:contactId', async (req, res, next) => {
  
  try {
      const {contactId} = req.params;
      const result = await dataContactOperation.getContactById(contactId);
      if (!result) {

        throw HttpError(404, "Not Found");
      }

      res.json(result);

   } catch (error) {
      next(error);
  }


})

router.post('/', async (req, res, next) => {
  try {
      const {error} = addSchema.validate(req.body);
      if (error) {
      throw HttpError(400, error.message);
    } 
    const {name, email, phone} = req.body;
    const result = await dataContactOperation.addContact(name, email, phone);
    res.status(201).json(result);
  }  catch (error) {
    next(error);
  }

});


router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router

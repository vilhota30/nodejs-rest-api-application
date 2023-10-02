const express = require('express');

const ctrl = require('../api/../../controllers/books');

const router = express.Router();

const { validateBody } = require('../../middlewares/validateBody');

const schemas = require('../../schemas/contacts');


router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addNewContact);

router.delete('/:contactId', ctrl.deleteContactById);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContactById);


module.exports = router;

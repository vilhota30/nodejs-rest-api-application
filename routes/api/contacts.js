const express = require('express');

const ctrl = require('../api/../../controllers/books');

const router = express.Router();

 const validateBody = require('../../middlewares/validateBody');
// const validId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');

const {addSchema} = require('../../schemas/contacts');
const {updateFavoriteSchema} = require('../../schemas/contacts');

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, ctrl.getContactById);

router.post('/', authenticate, validateBody(addSchema), ctrl.addNewContact);

router.delete('/:contactId', authenticate, ctrl.deleteContactById);

router.put('/:contactId', authenticate,  validateBody(addSchema), ctrl.updateContactById);

router.patch('/:contactId/favorite', authenticate, validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;


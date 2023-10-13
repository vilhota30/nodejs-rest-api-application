const express = require('express');

const ctrl = require('../api/../../controllers/books');

const router = express.Router();

 const validateBody = require('../../middlewares/validateBody');
// const validId = require('../../middlewares/isValidId');

const {addSchema} = require('../../schemas/contacts');
const {updateFavoriteSchema} = require('../../schemas/contacts');
router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(addSchema), ctrl.addNewContact);

router.delete('/:contactId',  ctrl.deleteContactById);

router.put('/:contactId',  validateBody(addSchema), ctrl.updateContactById);

router.patch('/:contactId/favorite', validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;


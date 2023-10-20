const express = require("express");
const router = express.Router();
const validateBody = require('../../middlewares/validateBody');
const authenticate = require('../../middlewares/authenticate');
const {schemas} = require('../../models/user');
const ctrl = require('../../controllers/auth');


router.post("/register", validateBody(schemas.registerShema), ctrl.register);

router.post("/login", validateBody(schemas.loginShema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;

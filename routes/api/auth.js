const express = require("express");
const router = express.Router();
const validateBody = require('../../middlewares/validateBody');
const authenticate = require('../../middlewares/authenticate');
const upload = require("../../middlewares/upload");
const {schemas} = require('../../models/user');
const ctrl = require('../../controllers/auth');



router.post("/register", validateBody(schemas.registerShema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.loginShema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);


module.exports = router;

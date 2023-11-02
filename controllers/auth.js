const {User} = require('../models/user');
const {HttpError, ctrlWrapper, sendEmail} = require('../helpers/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const {nanoid} = require("nanoid");


const {SECRET_KEY, BASE_URL} = process.env;

 const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email already in use");
    };
    
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationCode});


    await sendEmail({
        to: email,
        subject: "Please, confirm your email",
        html: `<h1> Please, confirm your email</h1><a href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    })

    
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });

};

const verifyEmail = async (req, res) => {
  
    const {verificationCode} = req.params;

    const user = await User.findOne({verificationCode});

    if (!user) {
        throw HttpError(401, "User not found")
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.status(201).json({
        message: "Verification successful"
    })

};

const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user) {
       throw HttpError(400, "missing required field email")
    };

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    };

    await sendEmail({
        to: email,
        subject: "Please, confirm your email",
        html: `<h1> Please, confirm your email</h1><a href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    });

    res.json({
        message: "Verify email send success"
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        throw HttpError(401, "Email or password invalid")
    };

    if (!user.verify) {
        throw HttpError(401, "Email not verify!")
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid")
    };

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
    })
};

const getCurrent = async (req, res) => {
    const {email, name} = req.user;

    res.json({
        email,
        name,
    });
};


const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "No Content"
    })
}

const updateAvatar = async (req, res) => {
   const {_id} = req.user;

   const {path: tempUpload, originalname} = req.file;

   const filename = `${_id}_${originalname}`;

   const resultUpload = path.join(avatarsDir, filename);
   await fs.rename(tempUpload, resultUpload);

   const resizeFile = await jimp.read(resultUpload);
   resizeFile.resize(250, 250).write(resultUpload);


   const avatarURL = path.join("avatars", filename);
   await User.findByIdAndUpdate(_id, {avatarURL});

   res.status(200).json({
    status: 'Update avatar',
    code: 200,
    avatarURL,
   })

};

module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
};


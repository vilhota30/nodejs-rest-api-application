const {Schema, model} = require("mongoose");
const Joi = require('joi');
const {handleMongooseError} = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
        name: {
          type: String,
          required: [true, 'Set name for user'],
        },
        password: {
          type: String,
          minlength: 6,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          match: emailRegexp
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: ""
        }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerShema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(6).required(),
   subscription: Joi.string().required(),
});

const loginShema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
 });

const schemas = {
  registerShema,
  loginShema,
}

const User = model("user", userSchema);

module.exports = {
    User, 
    schemas,
};




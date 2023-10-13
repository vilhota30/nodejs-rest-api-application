const Joi = require('joi');

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    favorite: Joi.boolean(),
    phone: Joi.string().required(),
    birthday: Joi.string().pattern(dateRegexp).required(),
 });

 const updateFavoriteSchema = Joi.object({
   favorite: Joi.boolean().required(),
 });

 module.exports = {
    addSchema,
    updateFavoriteSchema,
 }

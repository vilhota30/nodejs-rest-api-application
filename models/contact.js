const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");

const Regexp = /^\d{2}-\d{2}-\d{4}$/;

const contactShema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      favorite: {
        type: Boolean,
        default: false,
        required: true,
      },
      birthday: {
        type: String,
        match: Regexp,
        required: true,
      }
}, {versionKey: false, timestamps: true});

contactShema.post("save", handleMongooseError);

const Contact = model("contact", contactShema);

module.exports = Contact;

const {isValidObjectId} = require("mongoose");

const {HttpError} = require("../helpers");

const validId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(HttpError(400, `${id} is not valid id`))
    }
    next();

};

module.exports = validId;


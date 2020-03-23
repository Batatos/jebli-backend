const Joi = require('@hapi/joi');

//Create store validation
const createStoreValidation = (data) => {

    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        description: Joi.string().min(2).max(255).required(),
        working_hours: Joi.string().required(),
        working_days: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports.createStoreValidation = createStoreValidation;
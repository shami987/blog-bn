const joi = require('joi');
//Define the schema
const articleSchema = joi.object({
    title: joi.string().min(3).max(100).required(),
    content: joi.string().min(10).required(),
    author: joi.string().min(3).required()
});

//Middleware to validate request body
function validateArticle(req, res, next) {
    const { error } = articleSchema.validate(req.body);
    if(error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
module.exports = validateArticle;
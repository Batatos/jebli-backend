const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation/authValidation');

//validation
const Joi = require('@hapi/joi');
const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

router.post('/register',  async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send("Email Already exists . .");

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})



router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid email or password');

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);


})

module.exports = router;
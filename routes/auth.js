const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');

// Register a new User
router.post('/register', async (req,res) => {

    // Validations
    const error = registerValidation(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    
    // User already registered or not registered?
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists)
    {
        return res.status(400).send({message: 'Email already registered'});
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send(
            {
                userID: savedUser.id,
                status: 'User created'
            }
        );
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req,res) => {
    // Validation
    const error = loginValidation(req.body);
    if(error)
    {
        return res.status(401).send(error.details[0].message);
    }

    // Email Registered or not
    const user = await User.findOne({email: req.body.email});
    if(!user)
    {
        return res.status(401).send('Email not registered, Please register!');
    }

    // Password Matching
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword)
    {
        return res.status(401).send('Invalid Password!');
    }

    // JWT
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);

    res.send(
        {
            message: 'User Logged In Successfully!',
            user: user,
            token: token,
        }
    );

});

module.exports = router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// @desc            Register new users
// @request         POST
// @route           /api/users
// @access          Public
const registerUser = asyncHandler(async (request, response) => {
    const { firstName, lastName, email, password } = request.body;

    if (!firstName) {
        response.status(400);
        throw new Error('Please fill in first name');
    }
    if (!lastName) {
        response.status(400);
        throw new Error('Please fill in last name');
    }
    if (!email) {
        response.status(400);
        throw new Error('Please fill in email');
    }
    if (!password) {
        response.status(400);
        throw new Error('Please fill in password');
    }
    
    const repeatedEmail = await User.findOne({email});

    if (repeatedEmail) {
        response.status(400);
        throw new Error('Email already has a registered account');
    }

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({firstName, lastName, email, password: hashed});

    if (user) {
        response.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateJWTToken(user._id)
        })
    } else {
        response.status(400);
        throw new Error('Invalid user data provided');
    }

    response.json({message: 'User has been successfully registered'})
});

// @desc            Login users
// @request         POST
// @route           /api/users/login
// @access          Public
const loginUser = asyncHandler(async (request, response) => {
    const {email, password} = request.body;

    const user = await User.findOne({email});

    if (!user) {
        response.status(400);
        throw new Error('Email does not have a registered account')
    }

    if (await bcrypt.compare(password, user.password)) {
        response.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateJWTToken(user._id)
        })
    } else {
        response.status(400);
        throw new Error('Invalid password provided');
    }

    response.json({message: 'User has been successfully logged in'})
});

// @desc            Get user data
// @request         GET
// @route           /api/users/info
// @access          Private
const infoUser = asyncHandler(async (request, response) => {
    const { _id, firstName, lastName, email } = await User.findById(request.user.id);

    response.status(200).json({
        id: _id,
        firstName: firstName,
        lastName: lastName,
        email: email
    })

    response.json({message: 'Display User Data'})
});

const generateJWTToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '7d'});
}

module.exports = { registerUser, loginUser, infoUser };
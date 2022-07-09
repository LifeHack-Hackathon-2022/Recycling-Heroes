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
            email: user.email
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
            email: user.email
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
// @access          Public
const infoUser = asyncHandler(async (request, response) => {
    response.json({message: 'Display User Data'})
});

module.exports = { registerUser, loginUser, infoUser };
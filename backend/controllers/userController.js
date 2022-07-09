// @desc            Register new users
// @http request    POST
// @route           /api/users
// @access          Public
const registerUser = (request, response) => {
    response.json({message: 'Register User'})
}

// @desc            Login users
// @http request    POST
// @route           /api/users/login
// @access          Public
const loginUser = (request, response) => {
    response.json({message: 'Login User'})
}

// @desc            Get user data
// @http request    GET
// @route           /api/users/info
// @access          Public
const infoUser = (request, response) => {
    response.json({message: 'Display User Data'})
}

module.exports = { registerUser, loginUser, infoUser };
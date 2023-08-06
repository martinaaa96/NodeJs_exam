const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');

    }

    await User.create({ username, email, password })

}

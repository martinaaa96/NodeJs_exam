const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findByUserName = (username) => User.findOne(username);


exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');

    }
    const existingUser = await this.findByUserName(username);
    if (existingUser) {
        throw new Error('User exists');

    }


    // TODO :Validate password 

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ username, email, password: hashedPassword });


}

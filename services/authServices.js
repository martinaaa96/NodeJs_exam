const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const SECRET = '5316a6b56170d04422e3f5874798eea793cc8ccb';

exports.findByUserName = (username) => User.findOne({ username });

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');

    }
    const existingUser = await User.findOne({
        $or: [
            { email },
            { username },
        ]
    });
    if (existingUser) {
        throw new Error('User exists');

    }


    // TODO :Validate password 

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ username, email, password: hashedPassword });


}


exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');

    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
        username: user.username,

    }
    const token = await jwt.sign( payload, SECRET );

    return token;

}
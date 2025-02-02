const { mongoose } = require('mongoose')
const { createHmac, randomBytes } = require('crypto')
const { createTokenforUser } = require('../services/auth')
const Schema = mongoose.Schema({
    fullname: {
        type: String,
        requirded: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: '/images/img.jpg'
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
}, { timestamps: true })

Schema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return;

    //create salt :i:E create a random string of size you want
    const salt = randomBytes(32).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();
})

Schema.static('matchPasswordandToken', async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) throw new Error('User not found');

    //take salt of user and compare it with password of user
    const salt = user.salt;
    const hashedPassword = user.password

    const userProvidedhash = createHmac('sha256', salt).update(password).digest('hex');

    if (userProvidedhash !== hashedPassword) throw new Error('Password incorrect')
    const token = createTokenforUser(user)
    return token;
})
const Model = new mongoose.model('user', Schema)

module.exports = Model
const JWT = require('jsonwebtoken')

const secret = 'karan@123'

function createTokenforUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImg: user.profileImg,
        role: user.role
    }
    const token = JWT.sign(payload, secret)
    return token;
}
function validationToken(token) {
    try {
        const verifiedToken = JWT.verify(token, secret)
        return verifiedToken;
    } catch (error) {
        throw new Error('invalid token')
    }
}

module.exports = {
    createTokenforUser,
    validationToken
}
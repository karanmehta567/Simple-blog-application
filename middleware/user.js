const { validationToken } = require("../services/auth");

function checkforCookie(cookie) {
    return (req, res, next) => {
        const token = req.cookies[cookie]
        if (!token) {
            return next();
        }
        try {
            const userPayload = validationToken(token)
            req.user = userPayload

        } catch (error) {
            console.log(error)
        }
        return next();
    }
}
module.exports = { checkforCookie }
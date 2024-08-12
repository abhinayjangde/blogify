import JWT from "jsonwebtoken"
const secret = "$uper$ecret1234"
function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    }
    const token = JWT.sign(payload, secret)
    return token
}

function verifyToken(token) {
    const payload = JWT.verify(token,secret)
    return payload
}

export { createToken, verifyToken }
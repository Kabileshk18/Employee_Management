const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
    if(!token){
        res.status(401).json({error:"Access denied no token provided"})
    }
    try {
        const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        req.user = decoded
        console.log(req.user)
        next()
    } catch (error) {
        return res.status(401).json("Invalid token")
    }
}

const authorizeUser = (...allowedRoles) => {
    return(req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({error:"Access denied, Insufficient perimissions"})
        }
        next()
    }
}

module.exports = { authenticateUser, authorizeUser }
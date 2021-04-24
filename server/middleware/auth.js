const jwt = require('jsonwebtoken')



const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]//Authorization: Bearer dsankjxckmd => lay ra ca doan xoa' den bearer de lay token de kiem tra
    if(!token)
        return res.status(401).json({success: false, message: 'Access token not found'})
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    }catch (error){
        console.log(error)
        return res.status(403).json({success: false, message: 'Inavalid token'})//403 la form missden
    }
}

module.exports = verifyToken

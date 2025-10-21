import jwt from 'jsonwebtoken'

function authMiddleware (req, res, next){
    const token = req.cookies.access_token

    if(!token) {return res.status(401).json({message: "No token provided"})}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) {return res.status(401).json({message: "Invalid Token"})}
        req.userId = decoded.id
        req.userRole = decoded.role
        req.userName = decoded.username
        next()
    })
}

export default authMiddleware
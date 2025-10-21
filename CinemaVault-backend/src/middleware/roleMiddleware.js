import jwt from 'jsonwebtoken'
//import prisma from '../prismaClient.js'

function roleMiddleware(requiredRoles = []){
    return async (req, res, next) => {
    try{
        //First option for verifying roles
        /*const user = await prisma.user.findUnique({
        where:{
            id: Number(req.userId)
        }
    })*/
        //Second option
        const userRole = req.userRole
    if(!requiredRoles.includes(/*user.role*/ userRole)){
        return res.status(401).json({message: "No authorized"})
    }
    next()
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
    }
}

export default roleMiddleware
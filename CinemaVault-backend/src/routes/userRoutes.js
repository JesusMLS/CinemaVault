import express from 'express'
import prisma from '../prismaClient.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const router = express.Router()

//Get all users filtered by role (or not) in asc (id)
router.get('/', roleMiddleware(["admin"]), async (req, res) =>{
    const { role } = req.query
    const where = {...(role && { role: role })}
    try{
        const users = await prisma.user.findMany({
            orderBy:[{
                id: 'asc'
            }],
            where,
            include:{
                views: true
            }
        })
        res.json(users)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Delete a user by query id localhost:3000/users/55
router.delete('/:id', roleMiddleware(["admin"]), async (req, res) =>{
    const {id} = req.params
    try{
            //Verify an existing user with same id
            const existingUser = await prisma.user.findUnique({
                where:{
                    id: Number(id)
                }
            })
            if(!existingUser){
                return res.status(404).json({
                    message: `User with id:${id} is not in database.`
                })
            }
        const deletedUser = await prisma.user.delete({
            where:{
                id: Number(id)
            }
        })
        res.json(deletedUser)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router
import express from 'express'
import prisma from '../prismaClient.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const router = express.Router()

//Get all actors in name asc order
router.get('/', async (req, res) =>{
    try{
        const actors = await prisma.actor.findMany({
            orderBy:[{
                name: 'asc'
            }]
        })
        res.json(actors)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Delete an actor
router.delete('/:id', roleMiddleware(["admin"]), async (req, res) =>{
    const {id} = req.params
    try{
            //Verify an existing actor with same id
            const existingActor = await prisma.actor.findUnique({
                where:{
                    id: Number(id)
                }
            })
            if(!existingActor){
                return res.status(404).json({
                    message: `Actor with id:${id} is not in database.`
                })
            }
        const deletedActor = await prisma.actor.delete({
            where:{
                id: Number(id)
            }
        })
        res.json(deletedActor)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router
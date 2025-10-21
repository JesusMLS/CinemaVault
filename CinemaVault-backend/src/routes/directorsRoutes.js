import express from 'express'
import prisma from '../prismaClient.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const router = express.Router()

//Get all directors in name asc order
router.get('/', async (req, res) =>{
    try{
        const directors = await prisma.director.findMany({
            orderBy:[{
                name: 'asc'
            }]
        })
        res.json(directors)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Delete a director
router.delete('/:id', roleMiddleware(["admin"]), async (req, res) =>{
    const {id} = req.params
    try{
            //Verify an existing director with same id
            const existingDirector = await prisma.director.findUnique({
                where:{
                    id: Number(id)
                }
            })
            if(!existingDirector){
                return res.status(404).json({
                    message: `Director with id:${id} is not in database.`
                })
            }
        const deletedDirector = await prisma.director.delete({
            where:{
                id: Number(id)
            }
        })
        res.json(deletedDirector)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router
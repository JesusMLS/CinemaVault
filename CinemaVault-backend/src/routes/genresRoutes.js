import express from 'express'
import prisma from '../prismaClient.js'
import roleMiddleware from '../middleware/roleMiddleware.js'

const router = express.Router()

//GET /genres/?take=10&order=movies_asc
//Get genres (you can use filters)
router.get('/', async (req, res) =>{
    const {order} = req.query
    const take = Number(req.query.take) || 10
    const orderBy = order === 'movies_asc' ? [{ movies: { _count: 'asc' } }, { name: 'asc'} ]: order === 'movies_desc' ? [{ movies: { _count: 'desc' } }, { name: 'asc' }]: { name: 'asc' }
    try{
        const genres = await prisma.genre.findMany({
            take: take,
            orderBy,
            include:{
                _count: { select: { movies: true } }
            }
        })
        const sortedByName = genres.sort((a, b) => a.name.localeCompare(b.name))
        res.json(sortedByName)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Delete a genre
router.delete('/:id', roleMiddleware(["admin"]), async (req, res) =>{
    const {id} = req.params
    try{
            //Verify an existing genre with same id
            const existinggenre = await prisma.genre.findUnique({
                where:{
                    id: Number(id)
                }
            })
            if(!existinggenre){
                return res.status(404).json({
                    message: `genre with id:${id} is not in database.`
                })
            }
        const deletedgenre = await prisma.genre.delete({
            where:{
                id: Number(id)
            }
        })
        res.json(deletedgenre)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})


export default router
import express from 'express'
import prisma from '../prismaClient.js'
import roleMiddleware from '../middleware/roleMiddleware.js'


const router = express.Router()

//GET /movies/?skip=0&take=10&genre=action&order=year_asc&search=Order_33
//Get movies (you can use filters or not)
router.get('/', async (req, res) =>{
    let {featured, genre, year, order, search} = req.query
    let featuredBool = featured === 'true'
    const skip = Number(req.query.skip)|| 0
    const take = Number(req.query.take) || 10
    const where = {...(featured === undefined ? {}: { featured: featuredBool }), ...(genre && { genres : { some: { genre: { name:  { equals: genre } } }} }), ...(year && { year: Number(year) }),...(search && { OR : [{ title:{ contains: search } },{ directors:{ some: { director: {name: {contains: search }}}} },{ actors:{ some: { actor: {name: {contains: search }}}} }]})};
    const orderBy = order === 'year_desc' ? [{ year: 'desc' }, { title: 'asc' }] : order === 'year_asc' ? [{ year: 'asc' }, { title: 'asc' }] : order === 'views_desc' ? [{ views: { _count: 'desc' } }, { title: 'asc' }]: order === 'views_asc' ? [{ views: { _count: 'asc' } }, { title: 'asc' }]: order === 'created_asc' ? [{ created: 'asc' }, { id: 'asc' }]: order === 'created_desc' ? [{ created: 'desc' }, { id: 'asc' }]: order === 'rating_asc'? [ { rating: 'asc' }, { title: 'asc' } ]: order === 'rating_desc'? [ { rating: 'desc' }, { title: 'asc' } ] :{ title: 'asc' }
    try{
        const movies = await prisma.movie.findMany({
            skip: skip,
            take: take,
            where,
            ...(Object.keys(orderBy).length > 0 && { orderBy }),
            include:{
                genres: {
                    include:{
                        genre: true
                    }
                },
                directors: {
                    include:{
                        director: true
                    }
                },
                actors: {
                    include:{
                        actor: true
                    }
                },
                _count: { select: { views: true } }
            }
        });
        const total = await prisma.movie.count({ where })
        res.json({
            movies,
            total,
            actualPage: Math.floor(skip / take) + 1,
            totalPages: Math.ceil(total/take)
        })
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Get a specific movie info (by movie id)
router.get('/:id', async (req, res) =>{
    const movieId = Number(req.params.id)
    try{
        const movie = await prisma.movie.findUnique({
            where:{
                id: movieId
            },
            include:{
                genres:{
                    include:{
                        genre: true
                    }
                },
                actors:{
                    include:{
                        actor: true
                    }
                },
                directors:{
                    include:{
                        director: true
                    }
                },
                views: true
            }
        })
        if(!movie) return res.status(404).json({message: "Movie not found"})
        res.json(movie)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Create a new movie
router.post('/', roleMiddleware(["admin"]), async (req, res) =>{
    const { title, genres, directors, actors, description, year, featured} = req.body
    try{
            //Verify an existing movie with same title
            const existingMovie = await prisma.movie.findUnique({
                where:{
                    title: title
                }
            })
            if(existingMovie){
                return res.status(409).json({
                    message: `${title} is already in database.`
                })
            }
        const movie = await prisma.movie.create({
            data:{
                title,
                genres:{
                    create: genres.map(name =>({
                        genre:{
                            connectOrCreate:{
                                where: { name },
                                create: { name }
                            }
                        }
                    }))
                },
                directors:{
                    create: directors.map(name =>({
                        director:{
                            connectOrCreate:{
                                where: { name },
                                create: { name }
                            }
                        }
                    }))
                },
                actors:{
                    create: actors.map(name =>({
                        actor:{
                            connectOrCreate:{
                                where: { name },
                                create: { name }
                            }
                        }
                    }))
                },
                description,
                year,
                featured
            },
            include:{
                genres:{
                    include:{
                        genre: true
                    }
                },
                directors:{
                    include:{
                        director: true
                    }
                },
                actors:{
                    include:{
                        actor: true
                    }
                }
            }
        })
        res.json(movie)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Update a movie (by movie id)
router.put('/:id', roleMiddleware(["admin"]), async (req, res)=>{
    const {id} = req.params
    const {title, genres, directors, actors, description, year, rating, featured} = req.body
    try{
            //Verify an existing movie with same id
            const existingMovieById = await prisma.movie.findUnique({
                where:{
                    id: Number(id)
                }
            })
            if(!existingMovieById){
                return res.status(404).json({
                    message: `Movie with id:${id} is not in database.`
                })
            }

            //Verify an existing movie with same title
             const existingMovieByTitle = await prisma.movie.findUnique({
                where:{
                    NOT:{
                        id: Number(id)
                    },
                    title: title,
                }
            })
            if(existingMovieByTitle){
                return res.status(404).json({
                    message: `Movie with title:${title} already in database.`
                })
            }           

            //Removing past relations
            await prisma.movieActor.deleteMany({
                where: { movieId: Number(id) }
            })
            await prisma.moviegenre.deleteMany({
                where: { movieId: Number(id) }
            })
            await prisma.movieDirector.deleteMany({
                where: { movieId: Number(id) }
            })
        const updatedMovie = await prisma.movie.update({
            where:{
                id: Number(id)
            },
            data:{
                title,
                genres:{
                    create: genres.map(name =>({
                        genre:{
                            connectOrCreate:{
                                where: { name },
                                create: { name }
                            }
                        }
                    }))
                },
                directors:{
                    create: directors.map(name =>({
                        director:{
                            connectOrCreate:{
                                where: { name },
                                create: { name }
                            }
                        }
                    }))
                },
                actors:{
                    create: actors.map(name =>({
                        actor:{
                            connectOrCreate:{
                                where: { name },
                                create: { name }
                            }
                        }
                    }))
                },
                description,
                year,
                rating,
                featured
            },
            include:{
                genres:{
                    include:{
                        genre: true
                    }
                },
                directors:{
                    include:{
                        director: true
                    }
                },
                actors:{
                    include:{
                        actor: true
                    }
                }
            }
        });
        res.json(updatedMovie)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Delete a movie (by movie id)
router.delete('/:id', roleMiddleware(["admin"]), async (req, res) =>{
    const {id} = req.params
    try{
            //Verify an existing movie with same id
            const existingMovie = await prisma.movie.findUnique({
                where:{
                    id: Number(id)
                }
            })
            if(!existingMovie){
                return res.status(404).json({
                    message: `Movie with id:${id} is not in database.`
                })
            }
        const deletedMovie = await prisma.movie.delete({
            where:{
                id: Number(id)
            }
        })
        res.json(deletedMovie)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Add a movie to user list of viewed movies (by movie id)
router.post('/:id/view', async (req, res) =>{
    const userId = req.userId
    const movieId = Number(req.params.id)
    try{
            //Verify an existing movie with same id
            const existingMovie = await prisma.movie.findUnique({
                where:{
                    id: Number(movieId)
                }
            })
            if(!existingMovie){
                return res.status(404).json({
                    message: `Movie with id:${movieId} is not in database.`
                })
            }
        const addedView = await prisma.userMovieViewed.upsert({
            where:{
                userId_movieId: { userId, movieId }
            },
            update: {},
            create:{
                userId,
                movieId
            }
        })
        res.json(addedView)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})


export default router
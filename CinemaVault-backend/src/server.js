import express from 'express'
import authRoutes from './routes/authRoutes.js'
import moviesRoutes from './routes/moviesRoutes.js'
import authMiddleware from './middleware/authMiddleware.js';
import genresRoutes from './routes/genresRoutes.js'
import directorsRoutes from './routes/directorsRoutes.js'
import actorsRoutes from './routes/actorsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const PORT =  process.env.PORT || 3000;

const whiteList = ['http://localhost:3000', 'http://localhost:5173', 'https://service1:3000', 'https://service1:5173']


app.use(express.json())
app.use(cookieParser())
if(process.env.NODE_ENV === 'development'){
    const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
} else{
const corsOptions ={
    credentials: true,
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
}

//Routes
app.use('/auth', authRoutes)
app.use('/movies', authMiddleware, moviesRoutes)
app.use('/genres', authMiddleware, genresRoutes)
app.use('/directors', authMiddleware, directorsRoutes)
app.use('/actors', authMiddleware, actorsRoutes)
app.use('/users', authMiddleware, userRoutes)

app.listen(PORT, () =>{
    console.log('Backend listening on port: '+PORT)
})

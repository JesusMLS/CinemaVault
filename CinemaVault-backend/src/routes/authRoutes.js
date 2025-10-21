import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from  '../prismaClient.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

//Register a new user endpoint /auth/register (can be with our without 'role')
router.post('/register', async (req, res) =>{
    const { email, username, password, role } = req.body;
    try{
    //Verify an existing user with same username or email
    const existingUser = await prisma.user.findFirst({
        where:{
            OR:[
                {email: email},
                { username: username }
            ]
        }
    })
    if(existingUser){
        let conflicField = existingUser.email === email ? 'email' : 'username'
        return res.status(409).json({
            message: `The ${conflicField} is already in use.`
        })
    }

    //Encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    //Save the new user and hashed password to the db
        const user = await prisma.user.create({
            data:{
                email,
                username,
                password: hashedPassword,
                role: role ? role : "user"
            }
        })
        //Create a token 
        const token = jwt.sign({id: user.id, username: user.username,role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})

        //Saving token in cookies
        res.cookie('access_token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'lax',
            maxAge: 60*60*1000
        })

        res.json({message: 'Logged in successfully'})
    }catch(err){
        console.log(err.message)
        return res.sendStatus(503)
    }
})

router.post('/login', async(req, res) =>{
    const { email, password } = req.body;
    try{
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        //If we cannot find a user associated with that email, return out from the function
        if(!user) { return res.status(404).send({message:"Invalid Credentals"}) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        //if the password does not match, return out of the function
        if(!passwordIsValid) {return res.status(403).send({message:"Invalid Credentials"})}
        //then we have a successful authentication

        //Getting a new token
        const token = jwt.sign({id: user.id, username:user.username, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})

        //Saving token in cookies
        res.cookie('access_token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'lax',
            maxAge: 60*60*1000
        })

        res.json({message: 'Signed Up successfully'})
    }catch(err){
        console.log(err.message)
        return res.sendStatus(503)
    }
})

router.post('/logout', (req, res)=>{
    try{
    res.clearCookie('access_token')
    res.json('Logged out successfully')
    }catch(err){
        console.log(err.message)
        return res.sendStatus(503)
    }
})

//Get user info only if authenticated (works for fast session validation in front)
router.get('/info', authMiddleware, (req, res)=>{
    try{
        res.json({ id: req.userId, role: req.userRole, username: req.userName})
    }catch(err){
        console.log(err.message)
        return res.sendStatus(503)
    }
})

export default router
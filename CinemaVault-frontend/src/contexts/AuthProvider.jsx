import { createContext, useContext, useEffect, useState } from 'react'
import API from '../utils/api'
import { useLocation } from 'react-router'

const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    const protectedRoutes =[
        '/home',
        '/movies',
        '/movie',
        '/add/movie',
        '/genre',
        '/year'
    ]

    const isProtectedRoute = protectedRoutes.some((path) => location.pathname.startsWith(path))
    //const isLoginOrRegister = location.pathname==='/login' || location.pathname==='/register'

    useEffect(() =>{
        if(!isProtectedRoute /*&& !isLoginOrRegister*/){
            setLoading(false)
            return
        }
        API.get('/auth/info').then((response)=>{
            setUser(response.data)
            setLoading(false)
        })
        .catch(() =>{
            setUser(null)
            setLoading(false)
        })
    }, [isProtectedRoute, location.pathname])

    const logOut = () =>{
        API.post('/auth/logout').finally(()=>{
            setUser(null)
            window.location.href = '/login'
        })
    }

    const logIn = async (credentials) =>{
        try{
            await API.post('/auth/login', credentials)
            const response = await API.get('/auth/info')
            setUser(response.data)
            window.location.href = '/home'
        }catch(err){
            throw err
        }
    }

    return(
        <AuthContext.Provider value={{ user, loading, logIn, logOut }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}
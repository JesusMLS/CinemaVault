import { Outlet } from 'react-router'
import { AuthProvider } from '../contexts/AuthProvider'


export default function AuthLayout(){
    return (
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    )
}
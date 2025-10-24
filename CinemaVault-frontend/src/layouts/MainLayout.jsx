import { Outlet } from "react-router"
import Header from '../components/Header.jsx'
import Footer from "../components/Footer"
import {useAuth} from '../contexts/AuthProvider.jsx'
function MainLayout(){
    const { user, loading, logOut } = useAuth()

    if(loading || user === null) return null

    return(
        <div className="min-h-screen flex flex-col bg-white">
        <Header userInfo={user} logOut={logOut}/>
        <main className="grow flex flex-col items-center">
            <Outlet/>
        </main>
        <Footer/>
        </div>
    )
}

export default MainLayout
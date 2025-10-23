import { Outlet } from "react-router"
import Header from '../components/Header.jsx'
import Footer from "../components/Footer"
import {useAuth} from '../contexts/AuthProvider.jsx'
function MainLayout(){
    const { user, loading, logOut } = useAuth()

    if(loading || user === null) return null

    return(
        <>
        <Header userInfo={user} logOut={logOut}/>
            <Outlet/>
        <Footer/>
        </>
    )
}

export default MainLayout
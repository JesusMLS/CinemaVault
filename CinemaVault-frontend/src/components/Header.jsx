import ReactLogo from '../assets/react.svg'
import { useState, useEffect } from 'react'
import { IconMenu2 } from '@tabler/icons-react';
import API from '../utils/api'
import { Link } from 'react-router'

function Header({ userInfo, logOut }){
        const [genres, setGenres] = useState([])

        //Will be used later in render
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)

        //Request N1 (Obtain a List of Top 10 genres ordered by movies asc and title asc)
        useEffect(()=>{
        API.get('/genres/?take=10&order=movies_asc').then((response)=>{
            setGenres(response.data)
            setLoading(false)
        })
        .catch((err) =>{
            setError(err.message)
            setLoading(false)
        })
        }, [])
        
        //Create an Array of Genres Links to render V1 (not expanded menu)
        const genresComponents = genres.map((genre) =>{
            return <Link to={'/movies/genre/'+genre.name} key={genre.id} onClick={() =>toggleMenu('menu-genres-container')}>{genre.name} {genre._count.movies}</Link>
        })

        //Create an Array of Genres Links to render V2 (expanded menu)
        const genresComponentsExpanded = genres.map((genre) =>{
            return <Link to={'/movies/genre/'+genre.name} key={genre.id} onClick={() =>toggleMenu('menu-extended-container')}>{genre.name} {genre._count.movies}</Link>
        })

        //Create an array of past 10 Years, starting from the actual year
        const actualYear = new Date().getFullYear()
        const yearsArray = [actualYear, actualYear-1, actualYear-2, actualYear-3, actualYear-4, actualYear-5, actualYear-6, actualYear-7, actualYear-8, actualYear-9]

        //Create an array of Years Links to render V1 (not expanded menu)
        const yearsComponents = yearsArray.map((year, index) =>{
                                return <Link to={'/movies/year/'+year} key={index} onClick={() => toggleMenu('menu-years-container')}>{year}</Link>
                            })

        //Create an array of Years Links to render V2 (expanded menu)
        const yearsComponentsExpanded = yearsArray.map((year, index) =>{
                                return <Link to={'/movies/year/'+year} key={index} onClick={() => toggleMenu('menu-extended-container')}>{year}</Link>
                            })

        const handleLogout = () =>{
            logOut();
        }

        //Function to toggle a menu. You need to pass a menuId to the parameters of the function.
        function toggleMenu(menuId){
            let menuContainer = document.getElementById(menuId)
            menuContainer?.classList.toggle('hidden')
        }

    return (
        //Navigation Bar
        <nav id='navigationBar' className='shadow-sm top-0 bg-white sticky z-0'>
            {/* Items inside navigation Bar */}
        <div className='py-4 px-10 flex justify-between items-center'>
            <Link to='/home'>
            <div className='flex flex-row gap-3 justify-center items-center'>
                <img src={ReactLogo} alt='' className='w-10 h-10'></img>
                <p className='text-lg'>CinemaVault</p>
            </div>
            </Link>
            {/* Links can only appear when window size is >=md */}
            <div className='hidden md:flex md:flex-row md:gap-7'>
            <Link to='/home'>Home</Link>
            <Link to='/add/movie'>Add Movie</Link>
            <Link to='/movies'>Movies</Link>
            {/* Categories Container*/}
            <div className='relative'>
            {/* Categories Button*/}
            <button onClick={() =>{
                toggleMenu('menu-categories-container')
            }} className='cursor-pointer' type='button' title='categories'>Categories</button>
            {/* Categories Menu*/}
            <div id='menu-categories-container' className='hidden absolute w-auto h-auto top-6 right-0 bg-amber-100 shadow-lg rounded-sm'>
                    <div className='p-3 h-full text-base flex flex-col gap-5 text-center'>
                        <Link to='/movies/category/views_asc' onClick={() =>toggleMenu('menu-categories-container')}>User Views</Link>
                        <Link to='/movies/category/created_asc' onClick={() =>toggleMenu('menu-categories-container')}>Latest Posts</Link>
                        <Link to='/movies/category/year_asc' onClick={() =>toggleMenu('menu-categories-container')}>Latest Releases</Link>
                        <Link to={{pathname: '/movies', search: '?featured=true'}}  onClick={() =>toggleMenu('menu-categories-container')}>Featured by Administrators</Link>
                        <Link to='/movies/category/rating_asc' onClick={() =>toggleMenu('menu-categories-container')}>Best Califications</Link>
                    </div>
            </div>
            </div>
            {/* Genres Container*/}
            <div className='relative'>
            {/* Genres Button*/}
            <button onClick={() =>{
                toggleMenu('menu-genres-container')
            }} className='cursor-pointer' type='button' title='genres'>Genres</button>
            {/* Genres Menu*/}
            <div id='menu-genres-container' className='hidden absolute w-auto h-auto top-6 right-0 bg-amber-100 shadow-lg rounded-sm'>
                    <div className='p-3 h-full text-base flex flex-col gap-5 text-center'>
                        {genresComponents}
                        <Link to='/movies' className='font-bold' onClick={() =>toggleMenu('menu-genres-container')}>More</Link>
                    </div>
            </div>
            </div>
            {/* Years Container*/}
            <div className='relative'>
            {/* Years Button*/}
            <button onClick={() =>{
                toggleMenu('menu-years-container')
            }} className='cursor-pointer' type='button' title='years'>Years</button>
            {/* Years Menu*/}
            <div id='menu-years-container' className='hidden absolute w-auto h-auto top-6 right-0 bg-amber-100 shadow-lg rounded-sm'>
                    <div className='p-3 h-full text-base flex flex-col gap-5 text-center'>
                        {yearsComponents}
                        <Link to='/movies' className='font-bold' onClick={() =>toggleMenu('menu-years-container')}>More</Link>
                    </div>
            </div>
            </div>
            {/* User Container*/}
            <div className='relative'>
            {/* User Button*/}
            <button onClick={() =>{
                toggleMenu('menu-user-container')
            }} className='cursor-pointer' type='button' title='user'>{userInfo.username}</button>
            {/* User Menu*/}
            <div id='menu-user-container' className='hidden absolute w-auto h-auto top-6 right-0 bg-amber-100 shadow-lg rounded-sm'>
                    <div className='p-3 h-full text-base flex flex-col gap-5 text-center'>
                        <button className='cursor-pointer w-15 text-red-900' type='button' title='logOut' onClick={() =>{ toggleMenu('menu-user-container'); handleLogout()
                        }}>Log Out</button>
                    </div>
            </div>
            </div>
            </div>
            
            {/* Menu button, it only appears when window size is below md */}
            <button type='button' onClick={() =>{
                toggleMenu('menu-extended-container')
            }} className='cursor-pointer md:hidden' title='menu'>
                <IconMenu2 stroke={2} />
            </button>
        </div>

         {/* Extended Menu, it only appears when you use the button above */}
            {/* Items inside extended Menu */}
            <div id='menu-extended-container' className='hidden md:hidden absolute w-full h-auto top-17 right-0 left-0 bg-white shadow-lg'>
            <div className='p-7 h-full text-xl flex flex-col gap-5 text-center items-center'>
            <Link to='/home' onClick={() =>toggleMenu('menu-extended-container')}>Home</Link>
            <Link to='/add/movie' onClick={() =>toggleMenu('menu-extended-container')}>Add Movie</Link>
            <Link to='/movies' onClick={() =>toggleMenu('menu-extended-container')}>Movies</Link>
            {/* Categories*/}
            <div className='flex flex-col gap-1 items-center'>
            <button onClick={() =>{
                toggleMenu('grid-categories-container')
            }} className='cursor-pointer' type='button' title='categories'>Categories</button>
            <div id='grid-categories-container' className='hidden'>
            <div className='grid grid-cols-2 gap-1 text-sm p-2 bg-amber-100 rounded-2xl'>
                <Link to='/movies/category/views_asc' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>User Views</Link>
                <Link to='/movies/category/created_asc' className=' w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Posts</Link>
                <Link to='/movies/category/year_asc' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Releases</Link>
                <Link to={{pathname: '/movies', search: '?featured=true'}} className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Featured by Administrators</Link>
                <Link to='/movies/category/rating_asc' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Best Califications</Link>
            </div>
            </div>
            </div>
            {/* Genres*/}
            <div className='flex flex-col gap-1 items-center'>
            <button onClick={() =>{
                toggleMenu('grid-genres-container')
            }} className='cursor-pointer' type='button' title='genres'>Genres</button>
            <div id='grid-genres-container' className='hidden'>
            <div className='grid grid-cols-2 gap-1 text-sm p-2 bg-amber-100 rounded-2xl'>
                {genresComponentsExpanded}
                <Link to='/movies' className='font-bold w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>More</Link>
            </div>
            </div>
            </div>
            {/* Years*/}
            <div className='flex flex-col gap-1 items-center'>
            <button onClick={() =>{
                toggleMenu('grid-years-container')
            }} className='cursor-pointer' type='button' title='years'>Years</button>
            <div id='grid-years-container' className='hidden'>
            <div className='grid grid-cols-2 gap-1 text-sm p-2 bg-amber-100 rounded-2xl'>
                {yearsComponentsExpanded}
                <Link to='/movies' className='font-bold w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>More</Link>
            </div>
            </div>
            </div>
            {/* User*/}
            <div className='flex flex-col gap-1 items-center'>
            <button onClick={() =>{
                toggleMenu('grid-user-container')
            }} className='cursor-pointer' type='button' title={userInfo.username}>{userInfo.username}</button>
            <div id='grid-user-container' className='hidden'>
            <div className='grid grid-cols-1 gap-1 text-sm p-2 bg-amber-100 rounded-2xl'>
                <button className='cursor-pointer w-15 text-red-900' type='button' title='logOut' onClick={() =>{ toggleMenu('menu-extended-container'); handleLogout()
                }}>Log Out</button>
            </div>
            </div>
            </div>
            </div>  
            </div>     
        </nav>
    )
}

export default Header
import ReactLogo from '../assets/react.svg'
import { useState, useEffect } from 'react'
import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react'
import { IconMenu2 } from '@tabler/icons-react';
import API from '../utils/api'
import { Link } from 'react-router'

function Header({ userInfo, logOut }){
        const [genres, setGenres] = useState([])

        //Will be used later in render
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)

        //Request N1 (Obtain List of Top 10 genres ordered by movies asc and title asc)
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
        
        //Create an Array of Components to render
        const genresComponents = genres.map((genre) =>{
            return <a href={'/movies/genre/'+genre.name} key={genre.id} onClick={() =>toggleMenu('menu-genres-container')}>{genre.name} {genre._count.movies}</a>
        })
        
        //Create an array of Past 10 Years
        const actualYear = new Date().getFullYear()
        const yearsArray = [actualYear, actualYear-1, actualYear-2, actualYear-3, actualYear-4, actualYear-5, actualYear-6, actualYear-7, actualYear-8, actualYear-9]

        //Create an array of Components year to render
        const yearsComponents = yearsArray.map((year, index) =>{
                                return <a href={'/movies/year/'+year} key={index} onClick={() => toggleMenu('menu-years-container')}>{year}</a>
                            })

        const handleLogout = () =>{
            logOut();
        }

        function toggleSidebar(){
            let sidebarContainer = document.getElementById('menu-categories-container')
            sidebarContainer?.classList.toggle('hidden')
            document.body.classList.toggle('overflow-hidden')
        }

        function toggleMenu(menuId){
            let menuContainer = document.getElementById(menuId)
            menuContainer?.classList.toggle('hidden')
            document.body.classList.toggle('overflow-hidden')
        }

    return (
        //Navigation Bar
        <nav id='navigationBar' className='shadow-sm top-0 bg-white sticky w-full z-0'>
            {/* Items inside navigation Bar */}
        <div className='py-4 px-10 flex justify-between items-center'>
            <Link to='/home'>
            <div className='flex flex-row gap-3 justify-center items-center'>
                <img src={ReactLogo} alt='' className='w-10 h-10'></img>
                <p className='text-lg'>CinemaVault</p>
            </div>
            </Link>
            {/* Links can only appear when window size is >=sm */}
            <div className='hidden sm:flex sm:flex-row sm:gap-7'>
            <a href='/home'>Home</a>
            <a href='/add/movie'>Add Movie</a>
            <a href='/movies'>Movies</a>
            {/* Categories Container*/}
            <div className='relative'>
            {/* Categories Button*/}
            <button onClick={() =>{
                toggleMenu('menu-categories-container')
            }} className='cursor-pointer' type='button' title='categories'>Categories</button>
            {/* Categories Menu*/}
            <div id='menu-categories-container' className='hidden absolute w-auto h-auto top-6 right-0 bg-amber-100 shadow-lg rounded-sm'>
                    <div className='p-3 h-full text-base flex flex-col gap-5 text-center'>
                        <a href='/movies/category/views' onClick={() =>toggleMenu('menu-categories-container')}>User Views</a>
                        <a href='/movies/category/posted' onClick={() =>toggleMenu('menu-categories-container')}>Latest Posts</a>
                        <a href='/movies/category/released' onClick={() =>toggleMenu('menu-categories-container')}>Latest Releases</a>
                        <a href='/movies/category/featured' onClick={() =>toggleMenu('menu-categories-container')}>Featured by Administrators</a>
                        <a href='/movies/category/califications' onClick={() =>toggleMenu('menu-categories-container')}>Best Califications</a>
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
                        <a href='/movies' className='font-bold' onClick={() =>toggleMenu('menu-genres-container')}>More</a>
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
                        <a href='/movies' className='font-bold' onClick={() =>toggleMenu('menu-years-container')}>More</a>
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
                        <button className='cursor-pointer font-bold w-15' type='button' title='logOut' onClick={() =>{ toggleMenu('menu-user-container'); handleLogout()
                        }}>Log Out</button>
                    </div>
            </div>
            </div>
            </div>
            {/* Menu button, it only appears when window size is below sm */}
            <button type='button' onClick={() =>{
                toggleMenu('menu-extended-container')
            }} className='cursor-pointer sm:hidden' title='menu'>
                <IconMenu2 stroke={2} />
            </button>
        </div>

         {/* Extended Menu, it only appears when you use the button above */}
            {/* Items inside extended Menu */}
            <div id='menu-extended-container' className='hidden sm:hidden absolute w-screen h-auto top-17 right-0 left-0 bg-white shadow-lg'>
            <div className='p-7 h-full text-xl flex flex-col gap-5 text-center items-center'>
            <a href='/home'>Home</a>
            <a href='/add/movie'>Add Movie</a>
            <a href='/movies'>Movies</a>
            {/* Categories*/}
            <div className='flex flex-col gap-1 items-center'>
            <button onClick={() =>{
                toggleMenu('grid-categories-container')
            }} className='cursor-pointer' type='button' title='categories'>Categories</button>
            <div id='grid-categories-container' className='hidden'>
            <div className='grid grid-cols-2 gap-1 text-sm p-2 bg-amber-100 rounded-2xl'>
                <a href='/movies/category/views' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>User Views</a>
                <a href='/movies/category/posted' className=' w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Posts</a>
                <a href='/movies/category/released' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Releases</a>
                <a href='/movies/category/featured' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Featured by Administrators</a>
                <a href='/movies/category/califications' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Best Califications</a>
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
                <a href='/movies/category/views' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>User Views</a>
                <a href='/movies/category/posted' className=' w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Posts</a>
                <a href='/movies/category/released' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Releases</a>
                <a href='/movies/category/featured' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Featured by Administrators</a>
                <a href='/movies/category/califications' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Best Califications</a>
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
                <a href='/movies/category/views' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>User Views</a>
                <a href='/movies/category/posted' className=' w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Posts</a>
                <a href='/movies/category/released' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Latest Releases</a>
                <a href='/movies/category/featured' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Featured by Administrators</a>
                <a href='/movies/category/califications' className='w-32 truncate' onClick={() =>toggleMenu('menu-extended-container')}>Best Califications</a>
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
                <button className='cursor-pointer font-bold w-15' type='button' title='logOut' onClick={() =>{ toggleMenu('menu-extended-container'); handleLogout()
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
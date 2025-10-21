import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'
import ReactLogo from '../assets/react.svg'
import Image from 'react-bootstrap/Image'
import { useState, useEffect } from 'react'
import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react'
import API from '../utils/api'

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
            return <NavDropdown.Item href={'/movies/genre/'+genre.name} key={genre.id}>{genre.name} {genre._count.movies}</NavDropdown.Item>
        })
        
        //Create an array of Past 10 Years
        const actualYear = new Date().getFullYear()
        const yearsArray = [actualYear, actualYear-1, actualYear-2, actualYear-3, actualYear-4, actualYear-5, actualYear-6, actualYear-7, actualYear-8, actualYear-9]

        const handleLogout = () =>{
            logOut();
        }

    return (
        <header>
        <Navbar className='bg-body-secondary pb-0 pt-0'>
            <Container>
                <Nav className='me-auto'>
                    <Nav.Link href='/'>Link 1</Nav.Link>
                    <Nav.Link href='/'>Link 2</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href='https://www.facebook.com'><IconBrandFacebook/></Nav.Link>
                    <Nav.Link href='https://www.youtube.com'><IconBrandYoutube/></Nav.Link>
                    <Nav.Link href='https://www.instagram.com'><IconBrandInstagram/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Navbar collapseOnSelect expand="lg" className='bg-body-tertiary fs-5'>
            <Container>
                <Navbar.Brand href='/home' className='gap-3'>
                <img alt="" src={ReactLogo} width={30} height={30} className='d-inline-block align-top me-2'/>
                <span className='fs-5'>CinemaVault</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav' className='flex-grow-0'>
                    <Nav>
                        <Nav.Link href='/home'>Home</Nav.Link>
                        <Nav.Link href='/add/movie'>Add Movie (Temporal)</Nav.Link>
                        <Nav.Link href='/movies'>Movies</Nav.Link>
                        <NavDropdown title="Categories" id='basic-navbar-dropdown'>
                            <NavDropdown.Item href='/movies/category/views'>User Views</NavDropdown.Item>
                            <NavDropdown.Item href='/movies/category/posted'>Latest Posts</NavDropdown.Item>
                            <NavDropdown.Item href='/movies/category/released'>Latest Releases</NavDropdown.Item>
                            <NavDropdown.Item href='/movies/category/featured'>Featured by Administrators</NavDropdown.Item>
                            <NavDropdown.Item href='/movies/category/califications'>Best Califications</NavDropdown.Item>
                        </NavDropdown>
                        
                        <NavDropdown title="Genres" id='basic-navbar-dropdown'>
                            {genresComponents}
                            <NavDropdown.Item href='/movies' className='text-primary'>More</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Years" id='basic-navbar-dropdown'>
                            { yearsArray.map((year, index) =>{
                                return <NavDropdown.Item href={'/movies/year/'+year} key={index}>{year}</NavDropdown.Item>
                            }) }
                            <NavDropdown.Item href='/movies' className='text-primary'>More</NavDropdown.Item>
                        </NavDropdown>
                    <NavDropdown title={userInfo.username} id='user-dropdown'>
                        <NavDropdown.Item className='text-danger' onClick={handleLogout}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header
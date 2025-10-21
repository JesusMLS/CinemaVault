import { Carousel } from '@mantine/carousel'
import { Paper, Text, Title, Card, Image } from '@mantine/core'
import { useEffect, useState } from 'react'
import ReactLogo from '../assets/react.svg'
import API from '../utils/api'

function MoviesCarousel(){
        const [movies, setMovies] = useState([])
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)
        //Could be used in the future for a reload button
        //const [reload, setReload] = useState(false)

        //Request N1 (Obtain List of Movies where featured=true, and order them by id)
        useEffect(()=>{
        API.get(`/movies/?skip=0&take=0&featured=true`).then((response)=>{
            setMovies(response.data)
            setLoading(false)
        })
        .catch((err) =>{
            setError(err.message)
            setLoading(false)
        })
        }, [])

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>

    const moviesComponents = movies.movies.map((movie, index) =>{
        return <Carousel.Slide key={movie.id}>
            <a href={'/movie/'+movie.id}><Image src={ReactLogo}/></a>
            </Carousel.Slide>
    })

    return(
        <Carousel slideSize={{ base: '100%', sm:'50%', md: '25%' }} slideGap='md' emblaOptions={{ loop: false, align: 'start', slidesToScroll: 1 }} py='xs'>
            {moviesComponents}
        </Carousel>
    )
}

export default MoviesCarousel
import { Title, Container } from '@mantine/core'
import MoviesList from '../components/MoviesList'
import { useLocation } from 'react-router'

function Movies(){
    const location = useLocation()
    return (
         <MoviesList key={location.key}/>
    )
}

export default Movies
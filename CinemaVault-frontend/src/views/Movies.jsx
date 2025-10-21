import { Title, Container } from '@mantine/core'
import MoviesList from '../components/MoviesList'

function Movies(){
    return (
        <main>
            <Container mt='30px'>
                <Title order={3}>Movies</Title>
                <MoviesList/>
            </Container>
        </main>
    )
}

export default Movies
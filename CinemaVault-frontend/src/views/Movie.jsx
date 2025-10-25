import { Title } from '@mantine/core'
import { useParams } from 'react-router'

function Movie(){
    const { movieId } = useParams()
    return (
        <div>
            <Title order={3}>Movie</Title>
            <p>{movieId}</p>
        </div>
    )
}

export default Movie
import SingleCard from "./SingleCard"
import { Card, SimpleGrid, Container, Button, ActionIcon, Group} from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconReload } from '@tabler/icons-react'
import API from "../utils/api"


function CardsList(){
    
        const [movies, setMovies] = useState([])
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)
        const [reload, setReload] = useState(false)

        //Request N1 (Obtain List of Top 6 movies ordered by views asc)
        useEffect(()=>{
        API.get('/movies/?take=6&order=views_desc').then((response)=>{
            setMovies(response.data)
            setLoading(false)
        })
        .catch((err) =>{
            setError(err.message)
            setLoading(false)
        })
        }, [reload])

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>
    
    const moviesComponents = movies.movies.map((movie, index) =>{
        return <SingleCard key={index} movie={movie}/>
    })

    return(
        <Container py='xs'>
            <Group justify="right">
            <ActionIcon size='xl' me={0} onClick={()=>{
                setReload((reload) =>{
                    return !reload
                })
            }}>
                <IconReload/>
            </ActionIcon>
            </Group>
            <SimpleGrid cols={3} mt='md'>
                {moviesComponents}
            </SimpleGrid>
        </Container>
    )
}

export default CardsList
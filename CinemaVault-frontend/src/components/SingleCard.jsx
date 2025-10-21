import ReactLogo from '../assets/react.svg'
import {Card, Image, Text, Button, AspectRatio} from '@mantine/core'

function SingleCard(props){
    const movieData = props.movie
    const numberOfViews = movieData._count
    return(
        <Card withBorder shadow='sm' radius='md'>
            <AspectRatio ratio={1920/1080}>
            <Image src={ReactLogo} alt='' radius='md'/>
            </AspectRatio>
            <Text fw={500} mb='xs'>Title: {movieData.title}</Text>
            <Text size='sm' c='dimmed'>Description: {movieData.description}</Text>
            <Text size='sm' c='dimmed'>Number of views: {numberOfViews.views}</Text>
            <Button component="a" color='blue' fullWidth mt='md' radius='md' href={"/movie/"+movieData.id}>View Details</Button>
        </Card>
    )
}

export default SingleCard
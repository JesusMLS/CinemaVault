import ReactLogo from '../assets/react.svg'
import {Card, Image, Text, Button, AspectRatio} from '@mantine/core'

function SimpleSingleCard(props){
    const movieData = props.movie
    return(
        <Card component='a' href={'/movie/'+movieData.id} bg='white' w={178}>
            <Image src={ReactLogo} alt='' radius='md' w='auto' fit='contain' pb={10}/>
            <Text fw={500} style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{movieData.title}</Text>
        </Card>
    )
}

export default SimpleSingleCard
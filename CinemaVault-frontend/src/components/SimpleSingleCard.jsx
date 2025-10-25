import ReactLogo from '../assets/react.svg'
import ImageTest from '../assets/j5jngjqK8B5rdfgxMdnvyagKUgI.jpg'
import {Card, Image, Text, Button, AspectRatio} from '@mantine/core'
import { Link } from 'react-router'

function SimpleSingleCard(props){
    const movieData = props.movie
    return(
        <Link to={'/movie/'+movieData.id}>
        <div className='flex flex-col gap-1 p-0 justify-center items-left'>
            <img src={ImageTest} alt='' className='w-auto h-full rounded'/>
            <p className='font-extralight text-sm'>{movieData.title}</p>
        </div>
        </Link>
    )
}

export default SimpleSingleCard
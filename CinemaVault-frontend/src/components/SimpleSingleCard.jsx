import ReactLogo from '../assets/react.svg'
import {Card, Image, Text, Button, AspectRatio} from '@mantine/core'
import { Link } from 'react-router'

function SimpleSingleCard(props){
    const movieData = props.movie
    return(
        <div className='bg-white rounded-2xl flex flex-col gap-1 p-5 justify-center items-left w-auto h-20 sm:h-40 md:h-60 lg:h-80'>
            <img src={ReactLogo} alt='' className='w-auto h-full bg-blue '/>
            <p className='font-bold text-sm'>{movieData.title}</p>
        </div>
    )
}

export default SimpleSingleCard
import Section from "./Section"
import ReactLogo from '../assets/react.svg'
import { Link } from 'react-router'

function Footer(){
    return(
        <Section Id='footer' AddPading={false}>
            <footer className="shadow- bg-red/10 p-12 flex flex-col gap-4 items-center justify-center">
                <Link to='/home'>
                <div className="flex flex-row gap-3 justify-center items-center">
                    <img src={ReactLogo} alt='' className='w-10 h-10'></img>
                    <p className='text-lg'>CinemaVault</p>
                </div>
                </Link>
                <div className="flex flex-col gap-4 text-center justify-center sm:flex-row">
                    <p>&copy; 2025</p>
                    <p className="hidden md:flex justify-center items-center">|</p>
                    <p>Developed by <span className="underline">JesusMLS</span></p>
                </div>
            </footer>
        </Section>
    )
}

export default Footer
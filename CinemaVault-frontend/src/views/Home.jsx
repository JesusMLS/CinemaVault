import FirstPart from "../components/FirstPart"
import MoviesCarousel from "../components/MoviesCarousel"
import CardsList from "../components/CardsList"
import { Title, Container } from '@mantine/core'

function Home(){
    return (
        <main>
            <FirstPart/>
            <Container>
            <Title order={1}>Top 6 Most Viewed By Users</Title>
            <CardsList/>
            </Container>
            <Container size='xl' >
            <Title order={1}>Featured by Administrators</Title>
            <MoviesCarousel/>
            </Container>
        </main>
    )
}


export default Home
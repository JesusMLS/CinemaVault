import SimpleSingleCard from "./SimpleSingleCard"
import { Grid, Container, Card, Pagination, Flex, Group, TextInput, NumberInput, Checkbox } from "@mantine/core"
import { useEffect, useState } from "react";
import { useForm } from '@mantine/form'
import { useParams } from "react-router";
import API from "../utils/api";
import Section from "./Section";

function MoviesList(){
        const { genre, search, year, featured }= useParams()
        const [movies, setMovies] = useState([])
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)

        //Could be used in the future for a reload button
        //const [reload, setReload] = useState(false)

        const [page, setPage] = useState(1)
        const [totalPages, setTotalPages] = useState(1)

    //Filter Parameters
    const [filters, setFilters] = useState({
        year: year || '',
        search: search || '',
        featured: featured || false,
        genre: genre || ''
    })

    const form = useForm({
        initialValues:{
            search: '',
            year: '',
            featured: false,
            genre: ''
        }
    })

        //Request N1 (Obtain List of Movies, ordered, filtered, or without any of them)
        useEffect(()=>{
        const take = 24;
        const skip = (page -1 ) * take
        API.get(`/movies/?skip=${skip}&take=${take}&search=${filters.search}&year=${filters.year}&featured=${filters.featured}&genre=${filters.genre}`).then((response)=>{
            setMovies(response.data)
            setTotalPages(response.data.totalPages)
            setPage(response.data.actualPage)
            setLoading(false)
        })
        .catch((err) =>{
            setError(err.message)
            setLoading(false)
        })
        }, [page, filters])

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>
    
    const moviesComponents = movies.movies.map((movie, index) =>{
        return <div key={movie.id}><SimpleSingleCard key={index} movie={movie}/></div>
    })
    return(
        <Section Id='menu-list' AddPading={true}>
            <p className="text-2xl">Movies</p>
            <div className="p-4 bg-blue-200 flex flex-col items-center justify-center gap-3">
                <form onSubmit={form.onSubmit((values) =>{
                    setFilters((pastFilter) => ({
                        ...(pastFilter),
                        ...(values),
                        featured: !values.featured
                    }))
                })}>
                    <NumberInput label="Filter by year" placeholder="Example: 2022" min={1900} max={new Date().getFullYear()} key={form.key('year')} {...form.getInputProps('year')}></NumberInput>
                    <TextInput label="Search" placeholder="Example: Order 33" key={form.key('search')} {...form.getInputProps('search')} />
                    <Checkbox label="Featured" key={form.key('featured')} {...form.getInputProps('featured', { type: 'checkbox' })} onClick={(event) =>{
                        event.currentTarget.form.requestSubmit()
                    }}></Checkbox>
                    <input type="submit" hidden/>
                </form>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12  gap-4">
                {moviesComponents}
            </div>
            <Pagination total={totalPages} value={page} onChange={(p) =>setPage(p)} />
            </div>
        </Section>
    )
}

export default MoviesList
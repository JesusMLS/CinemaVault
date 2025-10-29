import SimpleSingleCard from "./SimpleSingleCard"
import { Grid, Container, Card, Pagination, Flex, Group, TextInput, NumberInput, Checkbox } from "@mantine/core"
import { useEffect, useState } from "react";
import { useForm } from '@mantine/form'
import { useParams, useLocation, useSearchParams } from "react-router";
import API from "../utils/api";
import Section from "./Section";

function MoviesList(){
        const { genre, search, year, order}= useParams()
        const [searchParams, setSearchParams] = useSearchParams()
        const [movies, setMovies] = useState([])
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null)
        const location = useLocation()

        //Could be used in the future for a reload button
        //const [reload, setReload] = useState(false)

        const [page, setPage] = useState(1)
        const [totalPages, setTotalPages] = useState(1)

    //Filter Parameters
    const [filters, setFilters] = useState({
        year: year || '',
        search: search || '',
        featured: searchParams.get("featured") || false,
        genre: genre || '',
        order: order || ''
    })

    const form = useForm({
        initialValues:{
            search: '',
            year: year || '',
            featured: searchParams.get("featured") || false,
            genre: genre || ''
        }
    })

        //Request N1 (Obtain List of Movies, ordered, filtered, or without any of them)
        useEffect(()=>{
        setLoading(true)
        const take = 24;
        const skip = (page -1 ) * take
        API.get(`/movies/?skip=${skip}&take=${take}&search=${filters.search}&year=${filters.year}&featured=${filters.featured}&genre=${filters.genre}&order=${filters.order}`).then((response)=>{
            setMovies(response.data)
            setTotalPages(response.data.totalPages)
            setPage(response.data.actualPage)
            setLoading(false)
            setError(null)
        })
        .catch((err) =>{
            setLoading(false)
            setError(err.message)
        })
        }, [page, filters, location])

    let moviesComponents
    if(loading === false && totalPages>0){
    moviesComponents = movies.movies.map((movie, index) =>{
        return <div key={movie.id}><SimpleSingleCard key={index} movie={movie}/></div>
    })
    }

    return(
        <Section Id='menu-list' AddPading={true}>
            {/* Inputs Section*/}
                <form onSubmit={form.onSubmit((values) =>{
                    setFilters((pastFilter) => ({
                        ...(pastFilter),
                        ...(values),
                        featured: !values.featured
                    }))
                    setSearchParams({featured: !values.featured})
                })} className="flex flex-col gap-3 justify-center items-center py-5">
                    <NumberInput label="Filter by year" placeholder="Example: 2022" min={1900} max={new Date().getFullYear()} key={form.key('year')} {...form.getInputProps('year')}></NumberInput>
                    <TextInput label="Search" placeholder="Example: Order 33" key={form.key('search')} {...form.getInputProps('search')} />
                    <Checkbox label="Featured" key={form.key('featured')} {...form.getInputProps('featured', { type: 'checkbox' })} onClick={(event) =>{
                        event.currentTarget.form.requestSubmit()
                    }}></Checkbox>
                    <input type="submit" hidden/>
                </form>
            {/* End Inputs Section*/}
            <div className="p-4 bg-blue-200 flex flex-col items-start justify-center gap-3 rounded-3xl">
            <p className="text-2xl bg-red">{order? (
             order=='views_asc'? 'By User Views': order=='created_asc'? 'Latest Entries': order=='year_asc'? 'Latest Releases': order=='rating_asc'? 'By Best Ratings': order
            ): 'Movies'}</p>
            {order && (
                <p className="text-sm">{
                order=='views_asc'? 'Here you will find Movies Ordered By User Views.': order=='created_asc'? 'Here you will find our Latest Movies Entries.': order=='year_asc'? 'Here you will find Movies Ordered by Most Recent Releases.': order=='rating_asc'? 'Here you will find Movies Ordered By Rating.': order
            }</p>
            )}
            {loading? <p className="text-2xl">Loading....</p>:error? <p className="text-xl">Error: {error}</p>: moviesComponents?
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                {moviesComponents}
            </div>: <p className="text-2xl">{ filters.search !== '' ? 'No results found for: "'+filters.search+'"' : 'No results found...' }</p>
            }
            <div className="flex flex-col justify-center items-center">
                <Pagination total={totalPages} value={page} onChange={(p) =>setPage(p)} />
            </div>
            </div>
        </Section>
    )
}

export default MoviesList
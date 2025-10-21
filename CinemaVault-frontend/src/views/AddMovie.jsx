import { Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { TextInput, Button, PasswordInput, Box, Group } from '@mantine/core'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router'
import API from '../utils/api'
import { useState } from 'react'

function AddMovie(){
    const { user, loading, logOut } = useAuth()
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    if(user.role === 'user'){
        return (<Title order={3}>Only Admin can add movies</Title>)
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { title: '', description: ''},

        validate:{
            title: (value) => (value.length >=5 ? null: 'Title must include at least 5 characters'),
            description: (value) => (value.length>=6 ? null: 'Description include at least 6 characters ')
        }
    })

        async function handleSubmit(values){
                await API.post('/movies', {
                    title: values.title,
                    description: values.description,
                    genres: ["Horror", "Action", "SCI-FI", "Drama"],
                    directors: ["Michael Williams"],
                    actors: ["Johny Rosado", "Sara Mendez", "Ash Ketchup"],
                    year: 2009,
                    featured: true
                }).then((response) =>{
                    console.log(response.data)
                    navigate('/movies')
                }).catch((err) =>{
                    setError(err.message)
                })
        }

    return (
        <Box maw={340} mx='auto'>
            <Title order={3}>Add A New Movie</Title>
            <div>{error}</div>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput label='Title' placeholder='Title' key={form.key('title')} {...form.getInputProps('title')}/>
                <TextInput label='Description' placeholder='Description' key={form.key('description')} {...form.getInputProps('description')}/>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit'>Submit</Button>
                </Group>
            </form>
        </Box>
    )
}

export default AddMovie
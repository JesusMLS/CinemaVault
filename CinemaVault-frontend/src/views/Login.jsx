import { Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { TextInput, Button, PasswordInput, Box, Group } from '@mantine/core'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router'
import API from '../utils/api'
import { useState } from 'react'

function Login(){
    const { user } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    if(!user === null){
        //navigate('/home')
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: 'secret' },

        validate:{
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length>=6 ? null: 'Must include at least 6 characters ')
        }
    })

        async function handleLogin(values){
                await API.post('/auth/login', {
                    email: values.email,
                    password: values.password
                }).then((response) =>{
                    console.log(response.data)
                    navigate('/home')
                }).catch((err) =>{
                    setError(err.response.data.message)
                })
        }

    return (
        <Box maw={340} mx='auto'>
            <Title order={3}>Login</Title>
            <div>{error}</div>
            <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
                <TextInput label='Email' placeholder='Email' key={form.key('email')} {...form.getInputProps('email')}/>
                <PasswordInput label='Password' placeholder='Password' key={form.key('password')} {...form.getInputProps('password')}/>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit'>Login In</Button>
                </Group>
            </form>
        </Box>
    )
}

export default Login
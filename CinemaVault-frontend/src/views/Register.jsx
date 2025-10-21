import { Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { TextInput, Button, PasswordInput, Box, Group } from '@mantine/core'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router'
import API from '../utils/api'
import { useState } from 'react'

function Register(){
    const { user } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    if(!user === null){
        //navigate('/home')
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', username: '', password: 'secret', confirmPassword: 'sevret' },

        validate:{
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            username: (value) => (value.length <5 ? 'Username must have at least 5 letters': null),
            password:(value) =>(value.length <6 ? 'Password must have at least 6 letters': null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null
        }
    })

        async function handleRegister(values){
                await API.post('/auth/register', {
                    email: values.email,
                    username: values.username,
                    password: values.confirmPassword,
                    role: 'admin' //temporal, ya que el crear usuario para admin aun no esta creado
                }).then((response) =>{
                    console.log(response.data)
                    navigate('/home')
                }).catch((err) =>{
                    setError(err.response.data.message)
                })
        }

    return (
        <Box maw={340} mx='auto'>
            <Title order={3}>Register</Title>
            <div>{error}</div>
            <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
                <TextInput label='Username' placeholder='Username' key={form.key('username')} {...form.getInputProps('username')}/>
                <TextInput label='Email' placeholder='Email' key={form.key('email')} {...form.getInputProps('email')}/>
                <PasswordInput label='Password' placeholder='Password' key={form.key('password')} {...form.getInputProps('password')}/>
                <PasswordInput label='Confirm password' placeholder='Confirm password' key={form.key('confirmPassword')} {...form.getInputProps('confirmPassword')}/>
                <Group justify='flex-end' mt='md'>
                    <Button type='submit'>Login In</Button>
                </Group>
            </form>
        </Box>
    )
}

export default Register
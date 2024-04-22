"use client "
import React, { useState } from 'react'
import { Button, Input } from '@material-tailwind/react'
const CreateUser = () => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [course, setCourse] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!id || !name || !age || !email || !password || !course) {
            alert("Please fill the all the input fields")
            return;
        }

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ id, name, age, email, password, course })
            })

            if (response.ok) {
                alert("User Successfully Created")
            } else {
                alert("Something Went Wrong")
                return;
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <Input label='ID' type='text' placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
                    <Input label='Name' type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input label='Age' type='text' placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    <Input label='Email' type='text' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input label='Password' type='text' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input label='Course' type='text' placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />

                    <Button className='mt-2' type='submit'>Create User</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser
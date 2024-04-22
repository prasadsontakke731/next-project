"use client"
import React, { useState } from 'react'
import { Button, Input } from '@material-tailwind/react'

const UpdateUser = () => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [course, setCourse] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!id) {
            alert("Please Provide User ID")
            return;

        }
        const requestedData = { id };
        if (name) {
            requestedData.name = name
        }
        if (email) {
            requestedData.email = email
        }
        if (age) {
            requestedData.age = age
        }
        if (password) {
            requestedData.password = password
        }
        if (course) {
            requestedData.course = course
        }

        try {
            const response = await fetch(`api/users`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(requestedData)
            })
            if (response.ok) {
                alert("User Updated Successfully")
                console.log(response);
                clearForm()
            } else {
                const data = await response.json()
                alert(data.result || "Something Went Wrong white updating user")
            }
        } catch (error) {
            alert(error)
        }


    }
    function clearForm() {
        setId("")
        setName("")
        setEmail("")
        setCourse("")
        setPassword("")
        setAge("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label='ID' type='text' placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
                <Input label='Name' type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label='Age' type='text' placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <Input label='Email' type='text' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label='Course' type='text' placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
                <Input label='Password' type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button className='mt-2' type='submit'>Update User</Button>
            </form>
        </div>
    )
}

export default UpdateUser
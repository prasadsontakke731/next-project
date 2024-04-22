"use client"
import { Button, Input } from '@material-tailwind/react'
import React, { useState } from 'react'

const DeletUser = () => {
    const [id, setId] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!id) {
            alert("Please Provide User ID to delete the user")
            return
        }
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE",

            })

            if (response.ok) {
                alert("User Deleted Successfully")
                clearForm()
            } else {
                const data = await response.json()
                alert(data.response || "Something Went Wrong whilet deleting user")
            }
        } catch (error) {
            alert(error)


        }
    }
    function clearForm() {
        setId("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label='User ID' type='text' placeholder='userID' value={id} onChange={(e) => setId(e.target.value)} />
                <Button className='mt-2' type='submit'>Delete User</Button>
            </form>
        </div>
    )
}

export default DeletUser
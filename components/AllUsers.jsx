"use client"
import React, { useEffect, useState } from 'react'
import { List, ListItem, Card } from "@material-tailwind/react"


const AllUsers = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/users")
            const userInfo = await response.json()
            console.log(userInfo.data);
            setUser(userInfo.data)
        }
        fetchData()
    }, [])
    return (
        <div>
            {
                user && user.map((item) => {
                    return (
                        <Card className='mb-4' key={item.id}>
                            <List>
                                <ListItem>{item.id} {item.name}</ListItem>
                            </List>

                        </Card>
                    )
                })
            }

        </div>
    )
}

export default AllUsers
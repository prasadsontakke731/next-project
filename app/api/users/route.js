import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs"

// 1. ALl Users Data
export function GET(req, res) {
    const data = users;

    return NextResponse.json({ data }, { status: 200 })
}

//4. creating User
export async function POST(req, res) {
    const { id, name, email, password, age, course } = await req.json()

    //check if data is provided
    if (!id && !name && !email || !password || !course || !age) {
        return NextResponse.json({ result: "Required field not found" }, { status: 400 })
    } else {
        // add new user in db.js
        users.push({ id, name, email, password, age, course })
        //extract user array from the updated data
        const updatedUsersData = users;

        //convert updated users to JSON string
        const updatedData = JSON.stringify(updatedUsersData, null, 2)

        //write the updated users array to a json string
        fs.writeFileSync("./app/util/db.js", `export const users = ${updatedData}`, "utf-8")

        return NextResponse.json({ result: "User Succeffully " })
    }




}

//5. Update User
export async function PUT(req, res) {
    const { id, name, email, age, course, password } = await req.json();

    //find the user in the users array by ID
    const userIndex = users.findIndex((user) => user.id === id)

    //check if user found
    if (userIndex === -1) {
        return NextResponse.json({ result: "User Not Found" }, { status: 404 })
    }

    if (name) {
        users[userIndex].name = name;
    }
    if (age) {
        users[userIndex].age = age;
    }
    if (email) {
        users[userIndex].email = email;
    }
    if (password) {
        users[userIndex].password = password;
    }
    if (course) {
        users[userIndex].course = course;
    }

    //extract just user array from updated data
    const updatedUsersArray = users;
    //convert the updated users array to a json string 
    const updatedData = JSON.stringify(updatedUsersArray, null, 2)
    //write the updated users array to json string 
    fs.writeFileSync(
        "./app/api/db.js",
        `export const users = ${updatedData}`,
        "utf-8"
    )

    return NextResponse.json({ success: "User Successfully Updated" })
}
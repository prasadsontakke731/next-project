import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs"
//2. get specific user
export async function GET(req, res) {
    const { id } = await res.params;

    const user = users.filter((u) => u.id === id)
    return NextResponse.json({ user }, { ok: true })
}

//3. Login
export async function POST(req, res) {
    const { name, email, password } = await req.json()

    const { id } = await res.params;

    const { name: uName, email: uEmail, password: uPassword } = users.find((u) => u.id === id)

    if (uName === name && uEmail === email && uPassword === password) {
        return NextResponse.json({ result: "Successfully logged in" })
    } else if (!name || !email || !password) {
        return NextResponse.json({ result: "Please fill al the inputs" })
    } else {
        return NextResponse.json({ result: "Invalid Credentials" })
    }
}
//6. Delete User
export async function DELETE(req, res) {
    const { id } = await res.params

    // find the index of user to delete in the users array
    const userIndex = users.findIndex((user) => user.id === id)

    //check if user is found
    if (userIndex === -1) {
        return NextResponse.json({ result: "User Not Found" }, { status: 404 })
    }

    //remove user from users array
    users.splice(userIndex, 1)
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

    return NextResponse.json({ success: "User Successfully Deleted" })
}
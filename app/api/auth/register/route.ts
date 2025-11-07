import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {email, password} = await request.json()

        if(!email ||!password){
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }

        connectToDatabase();

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }
        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {message: "User registered successfully"},
            {status: 200}
        )


    } catch (error) {
        console.error("Registeration Error", error)
        return NextResponse.json(
            {error: "Failed to reister user"},
            {status: 400}
        )
    }
}
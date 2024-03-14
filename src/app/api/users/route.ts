import { headers } from "next/headers"
import { NextResponse } from "next/server";
import { messages } from '@/utils/messages';
import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/models/User";

export async function GET(){
    try {
        await connectMongoDB();
        const users = await User.find();
        return NextResponse.json(
            {users},
            {status: 200}
        )    
    } catch (error) {
        return NextResponse.json(
            {message: messages.error.default, error},
            {status: 500}
        )
    }
}
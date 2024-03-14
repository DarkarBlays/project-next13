import { headers } from "next/headers"
import { NextResponse } from "next/server";
import { messages } from '@/utils/messages';
import jwt from "jsonwebtoken"
import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/models/User";

export async function GET(){
    try {
        const headersList = headers()
        const token = headersList.get("token");
        //valido que haya token
        if(!token){
            return NextResponse.json(
                {message: messages.error.noAuthorized},
                {status: 400}
            ); 
        }
        try {
            const isTokenValid = jwt.verify(token,'secreto');
            //@ts-ignore
            const {data} = isTokenValid;

            await connectMongoDB();
            const userFind = await User.findById(data._id);
            //Verificamos que exista el usuario
            if(!userFind){
                return NextResponse.json(
                    {message: messages.error.userNotFound},
                    {status: 400}
                ); 
            }
            return NextResponse.json(
                {message: messages.success.authorized},
                {status: 200}
            )
        } catch (error) {
            return NextResponse.json(
                {message: messages.error.tokenNotValid, error},
                {status: 400}
            )
        }

    } catch (error) {
        return NextResponse.json(
            {message: messages.error.default, error},
            {status: 500}
        )
    }
}
import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend"
import { messages } from '@/utils/messages';
import jwt from "jsonwebtoken"

const resend = new Resend("re_8MtbiDcP_7jAMvwUQbcfUL4ocBHhYHhvG")

export async function POST(request: NextRequest){
    try {
        const body: {email: string} = await request.json();
        const {email} = body;
        await connectMongoDB();
        const userFind = await User.findOne({email});
        //Validar que el usuario existe 
        if(!userFind){
            return NextResponse.json(
                {message: messages.error.userNotFound},
                {status: 400}
            )
        }
        const tokenData ={
            email: userFind.email,
            userId: userFind._id,
        }
        const token = jwt.sign({data: tokenData}, "secreto",{
            expiresIn: 86400,
        });
        const forgetUrl = `http://localhost:3000/change-password?token=${token}`;
        //@ts-ignore
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Cambio de contraseña',
            html: `<a href=${forgetUrl}>Cambiar Contraseña<a>`
        });
        return NextResponse.json(
            {message: messages.success.emailSent},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {message: messages.error.default, error},
            {status: 500}
        )
    }
}
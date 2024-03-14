import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

interface BodyProps{
    newPassword: string
    confirmPassword: string
}

export async function POST(request: NextRequest){
    try {
        const body: BodyProps = await request.json()
        const {newPassword,confirmPassword} = body;
        
        //Validar que esten todos los campos enviados
        if(!newPassword || !confirmPassword){
            return NextResponse.json(
                {message: messages.error.needProps},
                {status: 400}
            )
        }
        
        await connectMongoDB();
        const headerList = headers()
        const token = headerList.get('token')

        //Validar que haya token
        if(!token){
            return NextResponse.json(
                {message: messages.error.noAuthorized},
                {status:400}
            )
        }

        try {
            const isTokenValid = jwt.verify(token,'secreto');
            //@ts-ignore
            const {data} = isTokenValid;
            const userFind = await User.findById(data.userId);
            //Validamos que exista el usuario
            if(!userFind){
                return NextResponse.json(
                    {message: messages.error.userNotFound},
                    {status:400}
                )
            }
            //Validamos que la nueva contraseña sea igual a la confirmacion
            if(newPassword !== confirmPassword){
                return NextResponse.json(
                    {message: messages.error.passwordNotMatch},
                    {status:400}
                )
            }
            const hashedPassword = await bcrypt.hash(newPassword,10);
            userFind.password = hashedPassword;
            await userFind.save()
            return NextResponse.json(
                {message: messages.success.passwordChanged},
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
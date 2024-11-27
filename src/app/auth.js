import UserModel from "./(backend)/model/UserModel";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "../lib/dbConnect";
import Google from "next-auth/providers/google"
export const { 
    handlers,
    signIn,
    signOut,
    auth 
} = NextAuth({
    providers:[
        Credentials({
            credentials: {
                email: { label: "email" },
                password: { label: "Password", type: "password" },
                
            },
            async authorize( credentials ) {
                await dbConnect();
                try {
                    const { email, password } = credentials;
                    const user = await UserModel.findOne({email}).exec();
                    if(!user) {
                        throw new Error('No user found with this email');
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (error) {
                    return null;
                }
            },
        }),  
        Google
    ],
    callbacks:{
        async jwt({token, user}){
            return token;
        }, 
        async session({session, token}){
            return token;
        },
    },
    secret: process.env.AUTH_SECRET,

})
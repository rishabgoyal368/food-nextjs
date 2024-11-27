import UserModel from "@/app/(backend)/model/UserModel";
import dbConnect from "../../../../../lib/dbConnect";
import { makeResponse } from "@/lib/makeResponse";
import bcrypt from "bcryptjs";

export async function GET(request){
    await dbConnect();
    try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name'); 
    const getAllUsers = await UserModel.find({
        'role':0, 
        ...(name && { 
            $or: [
                { name: { $regex: name, $options: 'i' } }, 
                { email: { $regex: name, $options: 'i' } } 
            ]
        })
    });
    return makeResponse(true, 'fetching users', getAllUsers, 200);
    } catch (error) {
        return makeResponse(false, error?.message, {}, 400);
    }
}

export async function POST(request) {
    await dbConnect();
    const {firstName, lastName, email, password } = await request.json(); 
    try {
        const isUser = await UserModel.findOne({email});
        if(isUser){
            return Response.json({
                'success': false,
                'message':'Email is already in exist. Please enter a new email',
            },{status:400})
        }
        const saveUser = await UserModel.create({
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password':  await bcrypt.hash(password, 10),
            'role': 0, // user
        });
        return Response.json({
            'success': true,
            'message':'Login successful',
        },{status:200})

    } catch (error) {
        return Response.json({
            'success': false,
            'message':error.message,
        },{status:400})
    }
}
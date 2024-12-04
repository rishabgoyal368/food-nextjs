import dbConnect from "../../../../../../lib/dbConnect";
import UserModel from "../../../../model/UserModel";
import bcrypt from "bcryptjs";

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
            'role': 0,
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
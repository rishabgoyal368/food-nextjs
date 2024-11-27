import dbConnect from "../../../../../../lib/dbConnect";
import UserModel from "../../../../model/UserModel";

export async function POST(request){
 await dbConnect();
 const {email, password} = await request.json();

 const checkUser  = UserModel.findOne({email });
 if(!checkUser) {
  return Response.json({
    'success': true,
    'message':'Email is not exists',
   },{status:400})
 }
 

 return Response.json({
  'success': true,
  'message':'Login successful',
  data: {
    'token': 'asf'
  }
 },{status:200})
 
} 

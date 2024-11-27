import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type: 'string',
        required: true,
    },
    lastName: {
        type: 'string',
        required: true,
    }, 
    email:{
        required: true,
        type: 'string',
        unique: true,
    }, 
    password:{
        type: 'string',
        required: true,
    }, 
    profilePicture: {
        type: 'string',
        required: false,
    },
    otp:{
        type: 'string',
        required: false,
        default: null,
    }, 
    role:{
        type: 'number',
        required: false,
        default: 0
    }
});

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;
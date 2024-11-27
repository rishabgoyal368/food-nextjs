import mongoose from 'mongoose';

const connection = {};
dbConnect().catch(err => console.log(err));

async function dbConnect() {
    if(connection?.isConnected){
        console.log('Already connected to the database');
        return;
    }
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/food');
    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected successfully');
}


export default dbConnect;
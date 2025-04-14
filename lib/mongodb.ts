import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI as string
if(!MONGODB_URI){
    throw new Error('please add your mongo uri to .env.local');
}

let cached = (global as any).mongoose;

if(!cached){
    cached=(global as any).mongoose= {conn:null};
}

async function connectMongo(){
    if(cached.conn){
        console.log('already connected to mongodb');
        return cached.conn;
    }

    try{
        const connection = await mongoose.connect(MONGODB_URI);
        cached.conn=connection;
        console.log('connected to mongodb');
        return cached.conn;
    }
    catch(error){
        console.error('error connecting to mongodb',error);
        throw error;
    }
}

export default connectMongo;


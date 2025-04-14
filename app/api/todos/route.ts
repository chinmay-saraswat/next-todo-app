import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Todo from "@/models/todo.model";


//get fetch all todo

export async function GET(){
    await connectMongo();

    const todos= await Todo.find().sort({createdAt:-1});
    return NextResponse.json(todos);
}


export async function POST(req:Request){
    await connectMongo();
    console.log("connected")
    const body= await req.json();
    console.log(body);
    const newTodo=await Todo.create(body);
    console.log(newTodo)
    return NextResponse.json(newTodo,{status:201});
}
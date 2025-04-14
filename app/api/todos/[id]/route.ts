import { NextResponse } from "next/server";
import Todo from "@/models/todo.model";
import connectMongo from "@/lib/mongodb";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectMongo();
  const { id } = params;

  try {
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting todo', error },
      { status: 500 }
    );
  }
}
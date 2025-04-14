import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Todo from '@/models/todo.model';

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } =await context.params;

  await connectMongo();

  try {
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}

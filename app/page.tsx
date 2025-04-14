'use client';
import { useState} from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";
import axiosInstance from "@/lib/axios";

export default function Home() {
  
  const [todos,setTodos]=useState<Todo[]>([]);
  const [newTodo,setNewTodo]=useState('');

  useEffect(()=>{
    const fetchTodos = async()=>{
      try{
        const res = await axiosInstance.get('/todos');
        setTodos(res.data);
      }
      catch(error){
        console.error('failed to fetch the todo ',error);
      }
    }
    fetchTodos();
  },[]);

  const handleAddTodo = async()=>{
    if(newTodo.trim()==='')return;
    try{
      const res = await axiosInstance.post('/todos',{text:newTodo});
      setTodos([...todos,res.data]);
      setNewTodo('');
    }catch(error){
      console.error('failed to add todo',error)
    }
  }

  const handleToggle=async(id:string)=>{
   try{
    const updatedTodo = todos.find((todo)=>todo._id==id);
    if(!updatedTodo) return;
    const res=await axiosInstance.put(`/todos/${id}`,{
      completed:!updatedTodo.compleated
    })
    setTodos((prevtodo)=>
    prevtodo.map((todo)=>
    todo._id==id?res.data:todo)
    )
   }catch(error){
    console.error("Error toggling todo", error);
   }
  }

  const handleDelete = async(id:string)=>{
    try{
      const res=await axiosInstance.delete(`/todos/${id}`);
      setTodos((prevtodos)=>prevtodos.filter((todo)=>todo._id!==id));
     }catch(error){
      console.error("Error deleting todo", error);
     }
  }

  return (
    <main className="min-h-screen bg-gray-600 text-white p-6 max-w mx-auto">
    <h1 className="text-3xl font-bold mb-6">My Todo List</h1>

    <div className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Enter new task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="text-slate-300"
      />
      <Button onClick={handleAddTodo}>Add</Button>
    </div>

    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onToggle={handleToggle} onDelete={handleDelete}/>
      ))}
    </div>
  </main>
  );
}

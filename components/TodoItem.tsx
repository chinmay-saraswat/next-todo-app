import { Todo } from "@/types/todo";
import { Trash } from "lucide-react";
interface props {
    todo:Todo;
    onToggle:(id:string)=>(void);// 👈 New function passed from parent
    onDelete:(id:string)=>(void);
}

export default function TodoItem({todo,onToggle,onDelete}:props){
    return (
        <div
        className={`p-3 rounded bg-gray-800 flex justify-between items-center cursor-pointer hover:bg-gray-700 ${
          todo.compleated ? 'line-through text-gray-400' : ''
        }`}
      >
        <span onClick={()=>onToggle(todo._id)} className="cursor-pointer flex-1 text-white">{todo.text}</span>
        <button onClick={()=>onDelete(todo._id)} className="ml-2 p-1 hover:text-red-500"><Trash size={16}/></button>
      </div>
    );
};
import mongoose from "mongoose";
import { Schema,models } from "mongoose";

const todoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
export default Todo;
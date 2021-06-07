import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) { }
    // fetch all todos
    async getAllTodo(): Promise<Todo[]> {
        const todos = await this.todoModel.find().exec();
        return todos;
    }
    // Get a single todo
    async getTodo(todoID): Promise<Todo> {
        const todo = await this.todoModel.findById(todoID).exec();
        return todo;
    }
    // post a single todo
    async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
        const newTodo = await this.todoModel.create(createTodoDTO);
        return newTodo.save();
    }
    // Edit todo details
    async updateTodo(todoID, createTodoDTO: CreateTodoDTO): Promise<Todo> {
        const updatedTodo = await this.todoModel
            .findByIdAndUpdate(todoID, createTodoDTO, { new: true });
        return updatedTodo;
    }
    // Delete a todo
    async deleteTodo(todoID): Promise<any> {
        const deletedTodo= await this.todoModel.findByIdAndRemove(todoID);
        return deletedTodo;
    }
}

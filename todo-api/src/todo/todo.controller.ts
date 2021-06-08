import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) { }

    // add a todo
    @Post('/create')
    async addTodo(@Res() res, @Body() createTodoDTO: CreateTodoDTO) {
        const todo = await this.todoService.addTodo(createTodoDTO);
        return res.status(HttpStatus.OK).json({
            message: "Todo has been created successfully",
            todo
        })
    }

    // Retrieve todos list
    @Get('todos')
    async getAllTodo(@Res() res) {
        const todos = await this.todoService.getAllTodo();
        return res.status(HttpStatus.OK).json(todos);
    }

    // Fetch a particular todo using ID
    @Get('todo/:todoID')
    async getTodo(@Res() res, @Param('todoID') todoID) {
        const todo = await this.todoService.getTodo(todoID);
        if (!todo) throw new NotFoundException('Todo does not exist!');
        return res.status(HttpStatus.OK).json(todo);
    }

    // Update a todo's details
    @Put('/update')
    async updateTodo(@Res() res, @Query('todoID') todoID, @Body() createTodoDTO: CreateTodoDTO) {
        const todo = await this.todoService.updateTodo(todoID, createTodoDTO);
        if (!todo) throw new NotFoundException('Todo does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Todo has been successfully updated',
            todo
        });
    }

    // Delete a todo
    @Delete('/delete')
    async deleteTodo(@Res() res, @Query('todoID') todoID) {
        const todo = await this.todoService.deleteTodo(todoID);
        if (!todo) throw new NotFoundException('Todo does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Todo has been deleted',
            todo
        })
    }
}

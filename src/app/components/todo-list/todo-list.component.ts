// src/app/components/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

interface Todo {
    _id: string;
    text: string;
    isCompleted: boolean;
    isEditing?: boolean;
    editText?: string;
}

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
    todos: Todo[] = [];
    newTodo: string = '';

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.loadTodos();
    }

    loadTodos() {
        this.todoService.getTodos().subscribe(
            (data: Todo[]) => this.todos = data,
            error => console.error('Error fetching todos:', error)
        );
    }

    addTodo() {
        if (this.newTodo.trim()) {
            this.todoService.addTodo({ text: this.newTodo, isCompleted: false }).subscribe(
                (data: Todo) => {
                    this.todos.push(data);
                    this.newTodo = '';
                },
                error => console.error('Error adding todo:', error)
            );
        }
    }

    updateTodo(todo: Todo) {
        this.todoService.updateTodo(todo._id, { isCompleted: !todo.isCompleted }).subscribe(
            (data: Todo) => {
                const index = this.todos.findIndex(t => t._id === todo._id);
                this.todos[index] = data;
            },
            error => console.error('Error updating todo:', error)
        );
    }

    deleteTodo(id: string) {
        this.todoService.deleteTodo(id).subscribe(
            () => {
                this.todos = this.todos.filter(todo => todo._id !== id);
            },
            error => console.error('Error deleting todo:', error)
        );
    }

    editTodo(todo: Todo) {
        todo.isEditing = true;
        todo.editText = todo.text;
    }

    saveTodo(todo: Todo) {
        if (todo.editText && todo.editText.trim() !== '') {
            this.todoService.updateTodo(todo._id, { text: todo.editText }).subscribe(
                (data: Todo) => {
                    const index = this.todos.findIndex(t => t._id === todo._id);
                    this.todos[index] = { ...data, isEditing: false };
                },
                error => console.error('Error updating todo:', error)
            );
        } else {
            this.cancelEdit(todo);
        }
    }

    cancelEdit(todo: Todo) {
        todo.isEditing = false;
        todo.editText = undefined;
    }
}
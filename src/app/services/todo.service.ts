// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Todo {
    _id: string;
    text: string;
    isCompleted: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private apiUrl = 'http://localhost:5000/api/todos';

    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    addTodo(todo: { text: string; isCompleted: boolean }): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
    }

    updateTodo(id: string, updates: Partial<Todo>): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, updates);
    }

    deleteTodo(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
const addTodoBtn = document.querySelector('#add-todo');
const userInput = document.querySelector('#todo-input');

class Todo {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.id = Math.floor(Math.random() * 10000) + 1;
    }
}

class TodoList {
    _todoList = [];

    constructor() {
        if(TodoList.instance) {
            return TodoList.instance;
        }
        TodoList.instance = this; // singleton
    }
    
    add(todo) {
        this._todoList.push(todo);
        this.save();
    }
    getList() {
        return this._todoList;
    }
    checkTodo(id) {
        id = Number(id)
        const foundItem = this._todoList.find(todo => todo.id === id);
        if(foundItem !== -1) foundItem.isDone = !foundItem.isDone;
        this.save();
    }
    remove(id) {
        id = Number(id)
        for(const index in this._todoList) {
            if(this._todoList[index].id === id) {
                this._todoList.splice(index, 1);
            }
        }
        this.save();
    }
    save() {
        localStorage.setItem('todoList', JSON.stringify(this._todoList)); 
    }
    load() {
        const listFromStorage  = JSON.parse(localStorage.getItem('todoList'));
        this._todoList = [...listFromStorage];
    }
}

class TodoUI {

    _todoListStorage;

    constructor(id, text, isDone, todoListStorage) {
        
        this._todoListStorage  = todoListStorage;

        this.todoList = document.querySelector('#todo-list');
        this.todoItem = document.createElement('li');
        this.text = document.createElement('p');
        this.checkbox = document.createElement('input');
        this.deleteBtn = document.createElement('button');

        this.todoItem.id = id;
        this.text.textContent = text;
        isDone ? this.text.classList.add('checked') : this.text.classList.remove('checked');
        this.checkbox.type = 'checkbox';
        this.checkbox.checked = isDone;
        this.deleteBtn.textContent = 'Delete'

        this.buildTodo()
        this.addEvents()
    }

    buildTodo() {
        this.todoItem.append(this.text, this.checkbox, this.deleteBtn);
        this.todoList.appendChild(this.todoItem);
    }
    addEvents() {
        this.checkbox.addEventListener('click', () => {
            this._todoListStorage.checkTodo(this.todoItem.id)
            this.checkbox.checked ? this.text.classList.add('checked') : this.text.classList.remove('checked');
        })
        this.deleteBtn.addEventListener('click', () => {
            this._todoListStorage.remove(this.todoItem.id)
            this.todoItem.remove()
        })
    }
}

function addNewTodoItem(text) {
    const todoList = new TodoList();
    const todoItem = new Todo(text);
    todoList.add(todoItem)
    const todoUI = new TodoUI(todoItem.id, todoItem.text, todoItem.isDone, todoList);
}

function getStoredTodos() {
    const todoList = new TodoList();
    todoList.load()
    const allStoredTodos = todoList.getList()
    console.log(allStoredTodos)
    allStoredTodos.forEach(todo => {
        const todoUI = new TodoUI(todo.id, todo.text, todo.isDone, todoList);
    })
}

addTodoBtn.addEventListener('click', () => {
    if(userInput.value.strip !== '') addNewTodoItem(userInput.value)
});

document.addEventListener('DOMContentLoaded', getStoredTodos)
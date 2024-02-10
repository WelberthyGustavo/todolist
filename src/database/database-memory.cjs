const { randomUUID } = require('crypto');

class DatabaseMemory {
    #todoList = new Map();

    list(search) {
        return Array.from(this.#todoList.entries()).map((todoArray) => {
            const id = todoArray[0];
            const data = todoArray[1];

            return {
                id,
                ...data,
            }
        }).filter(todo => {
            if (search) {
                return todo.todoText.includes(search);
            }
            return true;
        });
        
    }

    create(todo){
        const todoId = randomUUID();
        this.#todoList.set(todoId, todo);
    }

    update(todoId, todo){
        this.#todoList.set(todoId, todo);
    }

    delete(todoId){
        this.#todoList.delete(todoId);
    }
}

module.exports = { DatabaseMemory };
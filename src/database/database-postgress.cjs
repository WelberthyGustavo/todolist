const { randomUUID } = require('crypto');
const sql = require('./db.cjs');

class DatabasePostgress {

    async list(search) {
        let todo;
        try {
            if (search){
            todo = await sql`select * from todolist where todotext ilike ${'%' + search + '%'}`;
            } else {
                todo = await sql`select * from todolist`;
            };
            
            return todo;
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async create(todo){
        try {
            const todoId = randomUUID();
            const { todoText, fyi, day, time, finished } = todo;
            await sql`insert into todolist (id, todotext, fyi, day, time, finished ) values (${todoId}, ${todoText}, ${fyi}, ${day}, ${time}, ${finished})`;
        
        } catch (error) {
            console.log('Error:', error)
        }
    }

    async update(todoId, todo){
        try {
            const { todoText, fyi, day, time, finished } = todo;
            await sql`update todolist set todotext = ${todoText}, fyi = ${fyi}, day = ${day}, time = ${time}, finished = ${finished} WHERE id = ${todoId}`;
        } catch (error) {
            console.log('Error:', error)
        }
    }
    

    async delete(todoId){
        try {
            await sql`delete from todolist where id = ${todoId}`
        } catch (error) {
            console.log('Error:', error)
        }
    }

}

module.exports = { DatabasePostgress };
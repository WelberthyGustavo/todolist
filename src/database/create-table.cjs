const sql = require('./db.cjs'); // Import the SQL object using require()


/*
sql`DROP TABLE IF EXISTS todolist;`.then(() => {
    console.log('Tabela Apagada');
})
*/


sql`
CREATE TABLE IF NOT EXISTS todolist (
    id TEXT PRIMARY KEY,
    todotext TEXT,
    fyi TEXT,
    day DATE,
    time TIME,
    finished BOOLEAN
);
`.then(() => {
    console.log("Tabela Criada");
});

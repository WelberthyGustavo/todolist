const express = require('express');
const router = express.Router();
// Importing router of express

/*
// Importing the DatabaseMemory correctly
const { DatabaseMemory } = require('../database/database-memory.cjs');
*/

const { DatabasePostgress } = require('../database/database-postgress.cjs');


const database = new DatabasePostgress();

/* Middleware */
router.use(express.json()); // For to do parsing of request body of JSON
router.use(express.urlencoded({ extended: true })); 

// Route GET to show all itens 
router.get('/', async (req, res)=> {
    const search = req.query.search;
    res.send( await database.list(search));
});

// Route POST to add a new item
router.post('/newtodo', async (req, res)=> {
    const { todoText, fyi, day, time, finished } = req.body;
    await database.create({
        todoText,
        fyi,
        day,
        time,
        finished
    });
    res.status(201).send();
});

// Route PUT to update any item  
router.put('/:id', async (req, res) => {
    const todoId = req.params.id;
    const { todoText, fyi, day, time, finished } = req.body;
    await database.update(todoId, {
        todoText,
        fyi,
        day,
        time,
        finished
    });
    res.status(201).send();
});

// Route delete to delete any item 
router.delete('/:id', async (req, res)=> {
    const todoId = req.params.id;
    await database.delete(todoId);
    res.status(201).send();
});

// Exporting the router for use in the main file
module.exports = router;

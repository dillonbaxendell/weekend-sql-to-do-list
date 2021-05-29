// NEED Express here
const express = require('express');
// Declare router and pool
const taskRouter = express.Router();
const pool = require('../modules/pool');


// GET
taskRouter.get( '/', ( req, res ) => {
    //declare queryText to send to SQL
    let queryText = 'SELECT * FROM "tasks" ORDER BY "dueDate" ASC;';

    //access pool to send to database
    pool.query( queryText )
    .then( result => {
        // Sends back the results in an object
        res.send(result.rows);
    })
    .catch( error => {
        console.log( 'Error when GETTING tasks', error );
        //send status
        res.sendStatus( 500 );
    });
});





// POST
// Adds a new task to the list of todos
// Request body must be a task object with all needed data inputs.
taskRouter.post( '/', ( req, res ) => {
    let newTask = req.body;
    console.log( 'Adding task: ', newTask );

    let queryText = `INSERT INTO "tasks" ("title", "priority", "dueDate", "notes", "isComplete")
                   VALUES ($1, $2, $3, $4, $5);`;

    let values = [ newTask.title, newTask.priority, newTask.dueDate, newTask.notes, newTask.isComplete ];

    pool.query( queryText, values )
    .then( result => {
        res.sendStatus( 201 );
    })
    .catch( error => {
        console.log( 'Error adding new task', error );
        res.sendStatus( 500 );
    })
})




// PUT






// DELETE



module.exports = taskRouter
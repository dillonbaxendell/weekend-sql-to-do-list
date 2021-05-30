// NEED Express here
const express = require('express');
// Declare router and pool
const taskRouter = express.Router();
const pool = require('../modules/pool');


// GET
taskRouter.get( '/', ( req, res ) => {
    //declare queryText to send to SQL
    let queryText = 'SELECT * FROM "tasks" ORDER BY "title" ASC;';

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
});




// PUT
taskRouter.put ( '/:id', (req, res) => {
    console.log( `got to /tasks/id`, req.params.id, req.body.isComplete );
    const taskId = req.params.id;

    const isComplete = req.body.isComplete;

    //what is this returning?
    console.log( taskId, isComplete.complete );
    

    queryText = '';
    
    if ( isComplete.complete == 'true' ){
        queryText = `UPDATE "tasks" SET "isComplete"=false WHERE "tasks".id = $1;`;
    }
    else if ( isComplete.complete == 'false' ){
        queryText = `UPDATE "tasks" SET "isComplete"=true WHERE "tasks".id = $1;`;
    }
    else {
        res.sendStatus( 500 )
        return;
    }

    pool.query( queryText, [taskId] )
    .then( response => {
        console.log( response.rowCount );
        res.sendStatus(202);
    })
    .catch ( err => {
        console.log( 'error in PUT on server', err );
        res.sendStatus( 500 )
    });


}); //end .put





// DELETE
taskRouter.delete( '/:id', ( req, res ) => {
    //grab the id of the task to delete from the params
    let taskToDelete = req.params.id;
    console.log( 'Task to delete: ', taskToDelete );

    const queryText = `DELETE FROM "tasks" WHERE "tasks".id = $1`

    pool.query( queryText, [taskToDelete] )
    .then( response => {
        console.log( 'Deleted task with ID# ', taskToDelete );

        res.send( 200 );
    })
    .catch( error => {
        console.log( 'Oops, you got an error while deleting!', error );

        res.sendStatus( 500 );
    });
});


module.exports = taskRouter
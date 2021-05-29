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






// PUT






// DELETE



module.exports = taskRouter
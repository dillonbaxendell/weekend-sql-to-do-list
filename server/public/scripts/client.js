const first = require("ee-first");

// First, is js loaded in console?
console.log('js loaded');

// DOM ready
$( document ).ready( readyNow );

//READY ON PAGE LOAD
function readyNow () {
    //code triggered here is safe to manipulate DOM
    console.log('DOM IS READY, jquery loaded');

    // Click Listeners
    // load buttons to be ready to function if clicked
    
};


function renderTasks ( tasks ) {
    console.log( 'in renderTasks' );

    // First, empty the target area
    $()
}


// GET
function refreshTasks () {
    console.log( 'in refreshTasks' );

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( response => {
        console.log( 'in GET, the response: ', response );
        //Call separate function of renderTasks to get the data to the DOM
        renderTasks( response );
    }).catch( error => {
        console.log( 'Error occurred in GET: ', error );
    })
}





// POST






// PUT






// DELETE
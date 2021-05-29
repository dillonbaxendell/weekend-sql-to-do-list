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

    // Call functions upon document load
    refreshTasks();
    
};

//TODO - figure out a way to have a checkbox in place of the isComplete table cell
//TODO   what does that look like?
function renderTasks ( tasks ) {
    console.log( 'in renderTasks' );

    // First, empty the target area
    $( '#taskDeck' ).empty();

    // For loop to cycle through the incoming data and append it to the DOM
    // from the database
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        // for each task, append a new row to the table
        $( '#taskDeck' ).append(`
            <tr id="edit">
                <td id="title">${task.title}</td>
                <td id="priority">${task.priority}</td>
                <td id="dueDate">${task.dueDate}</td>
                <td id="notes">${task.notes}</td>
                <td id="isComplete">${task.isComplete}</td>
                <td><button class="deleteBtn" data-id="${task.id}">DELETE</button></td>
                <td><button class="editBtn" data-id="${task.id}">EDIT</button></td>
      </tr> 
        `); 
    }
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




//? How do we get the time format to not display as Z000...etc.
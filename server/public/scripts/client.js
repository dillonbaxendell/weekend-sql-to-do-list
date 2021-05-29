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
    $( '#submit' ).on( 'click', handleSubmit );
    $( '#taskDeck' ).on( 'click', '.deleteBtn', handleDelete );

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
                <td><button class="isComplete" data-id="${task.id}">Mark Complete</button></td>
                <td><button class="deleteBtn" data-id="${task.id}">DELETE</button></td>
                
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
function handleSubmit () {
    console.log( 'clicked submit!' );
    console.log( $( '#taskTitle' ).val() );

    //grab the values of each input criteria
    let title = $( '#taskTitle' ).val();
    let priority = $( '#priority' ).val();
    let dueDate = $( '#dueDate' ).val();
    let notes = $( '#notes' ).val();
    let isComplete = $( '#isComplete' ).val();

    //create an object of a newTask with the above variables
    let newTask = {
        title: title,
        priority: priority,
        dueDate: dueDate,
        notes: notes,
        isComplete: isComplete
    };

    console.log( newTask );
    addTask( newTask );
};

// Adds the newTask to the database
function addTask( taskToAdd ) {
    console.log( 'in addTask', taskToAdd );

    $.ajax({
        method: 'POST',
        url: '/tasks',
        //needs a data variable to POST
        data: taskToAdd
    }).then( response => {
        console.log( 'Response from server: ', response );
        //refresh the tasks to update the DOM with the newTask
        refreshTasks();
    })
    .catch( error => {
        console.log( 'Error in POST ', error );
        //alert if unable to add task
        alert('Unable to add task at this time. Please try again later.');
    });
};





// PUT






// DELETE
function handleDelete () {
    console.log( 'clicked Delete!' );

    let taskID = $(this).data("id");

    deleteTask( taskID );
}

function deleteTask ( taskID ) {
    console.log( 'in deleteTask' );

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskID}`
    }).then( response => {
        console.log( 'Deleted Task ID: ', taskID );

        //refreshTasks to update the DOM after deletion
        refreshTasks();
    });
}



//? How do we get the time format to not display as Z000...etc.
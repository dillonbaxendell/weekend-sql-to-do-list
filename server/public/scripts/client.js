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
    $( '#taskDeck' ).on( 'click', '.isComplete', handleComplete );


    // Call functions upon document load
    refreshTasks();
    
};


function renderTasks ( tasks ) {
    console.log( 'in renderTasks' );

    // First, empty the target area
    $( '#taskDeck' ).empty();

    // For loop to cycle through the incoming data and append it to the DOM
    // from the database
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        //Declare pill and change the badge color based on priority level
        let pill;

        if (task.priority === "urgent") { 
            pill = 'bg-dark'
        }    
        else if ( task.priority === "high" ) {
            pill = 'bg-danger'
        }
        else if ( task.priority === "medium" ) {
            pill = 'bg-warning'
        }
        else if ( task.priority === "low" ) {
            pill = 'bg-primary'
        }

        // TODO // Try to filter the complete tasks to the bottom of the list by 
        // TODO // setting priority to an empty string
        if ( task.isComplete === true ) {
            task.priority = '';
        }
        else {
            task.priority;
        }


        if (task.isComplete === true ) {
        // for each task, append a new row to the table
        $( '#taskDeck' ).append(`
            <tr id="edit" class="markedComplete">
                <td id="title"><b>${task.title}</b></td>
                <td id="priority">${task.priority}</td>
                <td id="dueDate">${task.dueDate}</td>
                <td id="notes">${task.notes}</td>
                <td id="isComplete">${task.isComplete}</td>
                <td id="${task.isComplete}"><button class="isComplete btn btn-success btn-sm" data-id="${task.id}" data-complete="${task.isComplete}">✓</button></td>
                <td><button class="deleteBtn button btn btn-danger btn-sm" data-id="${task.id}">DELETE</button></td>
                
             </tr> 
         `); 
        } 
        else {
            $( '#taskDeck' ).append(`
            <tr id="edit">
                <td id="title"><b>${task.title}</b></td>
                <td id="priority"><span class="badge ${pill}">${task.priority}</span></td>
                <td id="dueDate">${task.dueDate}</td>
                <td id="notes">${task.notes}</td>
                <td id="isComplete">${task.isComplete}</td>
                <td id="${task.isComplete}"><button class="isComplete btn btn-secondary btn-sm" data-id="${task.id}" data-complete="${task.isComplete}">✓</button></td>
                <td><button class="deleteBtn button btn btn-danger btn-sm" data-id="${task.id}">DELETE</button></td>
            </tr> 
        `); 
        }
    }
};


// GET
function refreshTasks () {
    console.log( 'in refreshTasks' );

    //Ajax call to grab tasks from database
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
};


// POST
function handleSubmit () {
    console.log( 'clicked submit!' );

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

    //Call the addTask function with the newTask as the parameter
    addTask( newTask );
};

// Adds the newTask to the database
function addTask( taskToAdd ) {
    console.log( 'in addTask', taskToAdd );

    //Ajax call to post the newTask to the database and retrieve it back in the DOM
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
function handleComplete () {
    console.log( 'in handleComplete' );

    // Declare variable for clarity
    let taskId = $(this).data("id");
    let changeStatusTo = $(this).data();

    // Call markAsComplete function 
    markAsComplete ( taskId, changeStatusTo );
};


function markAsComplete ( taskId, changeStatusTo ) {
    console.log( 'clicked complete button' );

    // Ajax call to update the completion status in the database
    $.ajax({
      method:'PUT',
      url: `/tasks/${taskId}`,
      data: {
        isComplete: changeStatusTo
      }
    }).then( response => {
      console.log('Marked complete!');

      //refresh the DOM
      refreshTasks();
    })
    .catch(err =>{
      alert(`Something went wrong. Please try again`, err);
    })
};


// DELETE
function handleDelete () {
    console.log( 'clicked Delete!' );

    // Declare variable for clarity
    let taskID = $(this).data("id");

    // Call deleteTask with the declared variable as the parameter
    deleteTask( taskID );
}

function deleteTask ( taskID ) {
    console.log( 'in deleteTask' );

    // Ajax call to delete the task in the database via it's ID number
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskID}`
    }).then( response => {
        console.log( 'Deleted Task ID: ', taskID );

        //refreshTasks to update the DOM after deletion
        refreshTasks();
    });
};
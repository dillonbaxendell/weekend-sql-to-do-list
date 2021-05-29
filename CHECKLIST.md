# MY GAME PLAN

*** SERVER SETUP FILE STRUCTURE ***
[X] Make .gitignore file in root folder
[X] Make readme.md file in root folder (optional, but recommended)
    [X] Make server folder in root folder
        [X] Make server.js file in server folder
        [X] Make modules folder
        [X] Make public folder
            [ ] Add favicon.ico file in public folder
            [X] Make index.html in public folder
                [X] Link "./styles/style.css"
                [X] Source in "./vendors/jquery-3.6.0.js" above
                [X] Source in "./scripts/client.js"
                [X] Source in "./vendors/bootstrap.css"
                    [X] Bring in bootstrap.map.css to the vendors folder
            [X] Make scripts folder
                [X] Make client.js file here
                    [] Make sure to source in jQuery
            [X] Make styles folder
                [X] Make style.css file here
                [X] Source in bootstrap if you like
            [X] Make vendors folder
                [X] Add jQuery.js file here

*** NPM SETUP/CHEAT SHEET ***
[X] npm init --yes Makes a package.json — only need if doesn't exist already
[X] npm install 'library' installs library to project. Needs package.json
    [X] Express
    [X] pg
[X] npm install installs ALL EXISTING libraries in package.json
    [X] add script "start": "node server/server.js" to package.json under scripts
[] npm start if setup, will start server

*** INITIAL FILE ORGANIZATION ***
[X] server.js
    [X] Go get express
    [X] Make a server called app
    [X] Static files
    [X] Create PORT
    [X] Start listening for PORT connection
[X] index.html
    [X] Wire frame created (html:5)
    [X] Rename document to match as desired
[X] client.js
    [X] console.log('js loaded');
    [X] DOM Ready on readyNow
    [X] readyNow function created

# THE NITTY-GRITTY
The part of the To-Do List that tackles the nitty-gritty of the project and handles the requirements. Take the time to Plan. This. Out.

**Here are the specific components for the challenge:**

**Create a front end experience that allows a user to create a Task.**
    What does this look like?
        [X] We need some kind of form, inputs:
            [X] title (task name)
            [X] priority
            [X] dueDate
            [X] notes
            [X] isComplete (checkbox?)

**When the Task is created, it should be stored inside of a database (SQL)**
    [X] Create a database, name: todo_list
    [X] Create table of "tasks"
        [X] Columns include:
            [X] ID - Make this SERIAL and PRIMARY KEY
            [X] title (of task)
            [X] priority
            [X] dueDate
            [X] isComplete
    [X] Create database.sql in this project so people can easily access it
    [X] Connect the database to this project
        [X] Create a pool.js in modules folder (to free up space on server.js)
        [X] configuration created
        [X] pg sourced in
        [X] pool created
        [X] export pool to the server
        [X] make sure pool is accessible to any routers
            [X] task.router.js

**Whenever a Task is created the front end should refresh to show all tasks that need to be completed.**
    * CLIENT SIDE:
        GET:
            [X] Create a function to refreshTasks
            [X] GET, ajax call using url '/tasks'
            [X] Create renderTasks function to render the tasks received to the DOM
            [X] .then created
            [X] .catch with error created
        POST:
            [X] Upon hitting the button "Add Task" in the handleSubmit function:
            [X] Create addTask function that POSTS the task using url: '/tasks' to send a taskToAdd
            [X] .then created
            [X] refreshTasks
            [X] .catch with error created

    * SERVER SIDE (in router?):
        GET:
            [X] GET data from database to send back to client
            [X] .then created
            [X] .catch with error created
        POST:
            [X] INSERTS newTask into the database table
            [X] .then created
            [X] .catch with error created

**Each Task should have an option to 'Complete' or 'Delete'.**
    [] Create buttons in index.html 
        [] Mark as complete (again, do we want this as a checkbox?)
        [X] Delete 
    [X] Make sure these append to the DOM upon submission of a newTask
    [X] Create a handleDelete function in client.js that:
        [X] calls deleteTask function, which should:

        * CLIENT SIDE
            [X] make an ajax, DELETE call through url: '/tasks/ID
            [X] .then created
            [X] refreshTasks again to update the DOM
            [X] .catch with error created

        * SERVER SIDE (in router?)
            [] Grabs the taskToDelete (targeted from the ID) and deletes it using queryText (SQL)
            [] Ultimately deleting this specific ID# task from the database table
            [] .then created
            [] .catch with error created

**When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be  'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.**
    [] Create a style class or ID that replaces the style upon marking a task as complete
        [] What does this look like?
            [] Strike-through?
            [] Turns light gray?
            [] Goes into a different div of "Completed Tasks"?
    [] Logic created for visual representation

**Whether or not a Task is complete should also be stored in the database.**
    [] Make this column in the database a BOOLEAN?, complete: true, false

**Deleting a Task should remove it both from the front end as well as the Database.**
    [] Make sure logic is setup correctly to check this requirement off

### STYLING

**Use CSS styling to move the aesthetic of the page beyond the vanilla HTML look:**
  - background color of the page
    [] Pick a minimalist looking style? - I like the idea of it being clean-looking and minimalist-looking

  - font family and size
    [] Lowercase text for header is intriguing to me - makes it look clean too

  - text color & or background color of tasks *to show whether or not they have been completed*
    [] Does the background color of the task change based on priority?







  ## Stretch Goals

For each of your strech goals, you will be practicing git branching. Please refer to the branching notes for a reminder on commands. Each branch will be merged into master using `--no-ff`. This will allow us to see that you branched your feature when you turn in your code.

- `feature-styling-bootstrap` 

    - [ ]  Add Bootstrap to the front end and style it up!
      -  Buttons -- make the creation buttons and completion buttons green and the delete red.
      -  Inputs -- make your text inputs styled in the bootstrap way
      -  Responsive -- make your app responsive to different screen sizes -- check out the [Layout](https://getbootstrap.com/docs/4.1/layout/overview/) section

- `feature-confirm-delete`

    - [ ]  In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task.
        - Some styled options are [Bootstrap Modal](https://getbootstrap.com/docs/4.0/components/modal/) or [Sweet Alerts](https://sweetalert.js.org/guides/): Use the CDN option.

- `feature-ordering-task-query` 

    - [ ]  Research [Query Params](https://expressjs.com/en/api.html#req.query) to have the request reverse the order of the returned todos. 
    
- `feature-time-completed` 

    - [ ]  Add the ability to record when a task was completed. Show the completed date on the frontend in a pretty format.  
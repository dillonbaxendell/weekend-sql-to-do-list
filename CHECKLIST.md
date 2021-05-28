# To-Do

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
[] index.html
    [X] Wire frame created (html:5)
    [X] Rename document to match as desired
[X] client.js
    [X] console.log('js loaded');
    [X] DOM Ready on readyNow
    [X] readyNow function created
    
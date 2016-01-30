# family-name-draw
Small program for drawing names "out of a hat"

##Requirements
* Uses MySql with a DB called "fam" This is where a list of names are and a boolean if they are already "picked" or not.
* Runs Gulp with Browser-Sync and Nodemon for restarting the server upon change.
* Server is Node

##Running
* Clone the Repository
* change to the directory and then run NPM Install
* Ensure Browsery-sync, Gulp, and Nodemon are properly installed
* Run your MySQL Server and run the db_create.sql file to generate the DB (Change names to your family)
* Change the DB Connection Variables in the server.js file to properly connect to your DB.
* Run Gulp

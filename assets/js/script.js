// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Generating a unique id
function generateTaskId() {
    if (nextId === null) {
        nextId = 0;
    }
    else {
        nextId += 1;
    }

    return nextId;
}

// task: {title, date, description, progress()}
function createTaskCard(task) {
    taskCard = {
        id: generateTaskId(),
        title: 'Title',
        date: 'Today',
        description: 'ToDo',
        progress: 'None'

    }
}

// A function to render the task list and make cards draggable
function renderTaskList() {
    for(let i = 0; i < taskList.length; i++){
        taskList[i];
    }
}

// A function to handle adding a new task
function handleAddTask(event) {

}

// A function to handle deleting a task
function handleDeleteTask(event) {

}

//A function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // datepicker
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true
      });
});


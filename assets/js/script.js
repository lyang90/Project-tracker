// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const doneEl = document.getElementById('#done-cards');
const progressEl = document.getElementById('#in-progress-cards');
const toDoEl = document.getElementById('#todo-cards');


// Generating a unique id
function generateTaskId() {
    if (nextId === null) {
        taskList = [];
        nextId = 0;
    }
    else {
        nextId += 1;
    }

    //TODO store new value to local storage
    return nextId;
}

// task: {title, date, description, progress["todo", "in-progress", "done"]}
function createTaskCard(event) {
    const taskCard = {
        id: generateTaskId(),
        title: 'Title' ,
        date: 'Today',
        description: 'ToDo',
        progress: 'None'
    }
}

// A function to render the task list and make cards draggable
function renderTaskList() {
    for (let i = 0; i < taskList.length; i++) {
        // TODO change this to jQuery and move to createTaskCard & change color of background based on dueDate
        let newDiv = document.createElement('div');
        let cardHeader = document.createElement('div');
        let cardBody = document.createElement('div');
        let headerEl = document.createElement('h4');
        let pEl = document.createElement('p');
        let deleteBut = document.createElement('button');

        // Assigning the boostrap classes and setting the text content of elements
        newDiv.style.maxWidth = '350px';
        newDiv.className = 'data-mdb-connected-list'; // TODO check this is to make it draggable 
        headerEl.textContent = taskList[i].title;
        headerEl.className = 'card-title';
        pEl.textContent = taskList[i].description;
        pEl.className = 'card-text';
        cardHeader.className = 'card-header';
        cardBody.className = 'card-body';
        deleteBut.className = 'bg-danger text-white border border-danger rounded';
        deleteBut.type = 'button';

        // appending elements to the divs
        cardHeader.appendChild(headerEl);
        cardBody.appendChild(pEl);
        cardBody.appendChild(deleteBut);
        newDiv.appendChild(cardHeader);
        newDiv.appendChild(cardBody);

        
        // checking the card container and appending to the right card container 
        if (taskList[i].progress === "todo") {
            newDiv.className = "card text-white bg-success mb-3";
            toDoEl.appendChild(newDiv);

        }
        else if (taskList[i].progress === "in-progress") {
            newDiv.className = "card text-white bg-warning mb-3"
            progressEl.appendChild(newDiv);

        }
        else {
            newDiv.className = "card text-white bg-danger mb-3";
            doneEl.appendChild(newDiv);

        }       
    }
}

// A function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    
    
    //taskTitle, dueDate, task
    const taskCard = {
        id: generateTaskId(),
        title: $('#taskTitle').val(),
        date: $('#dueDate').val(),
        description: $('#task').val(),
        progress: 'ToDo',
    }
    
    taskList.push(taskCard); 
    localStorage.setItem('tasks', JSON.stringify(taskList));
    
    
    //TODO replace by createcard when implemented
    renderTaskList(); 
    
}

// A function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();
    taskList = taskList.filter((task) => {task.id !== event.id}) // TODO fix this tomorrow
    
    renderTaskList(); // TODO fix this

}

//A function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();
    // TODO make this draggable for columns of progress
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


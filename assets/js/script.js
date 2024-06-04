// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const done = $('#done-cards');
const progress = $('#in-progress-cards');
const toDo = $('#todo-cards');


// Generating a unique id
function generateTaskId() {
    if (nextId === null) {
        taskList = [];
        nextId = 0;
    }
    else {
        nextId += 1;
    }

    localStorage.setItem('nextId', JSON.stringify(nextId));
    return nextId;

}

// task: {title, dueDate, description, progress["todo", "in-progress", "done"]}
function createTaskCard(task) {

    // Using jQuery to create new elements and add bootstrap to them using add class 
    const taskCard = $('<div>').addClass('draggable z-3').attr('id', task.id);
    const cardHeader = $('<div>').addClass('card-header');
    const cardBody = $('<div>').addClass('card-body');
    const headerEl = $('<h4>').addClass('card-title').text(task.title);
    const pEl = $('<p>').addClass('card-text').text(task.description);
    const dueDate = $('<p>').addClass('card-text').text(task.date);
    const deleteBut = $('<button>').addClass('bg-danger text-white border border-dark rounded').text('Delete');

    //Appending to divs to one another
    cardHeader.append(headerEl);
    cardBody.append(dueDate, pEl, deleteBut);
    taskCard.append(cardHeader, cardBody);

    const today = dayjs();
    // checking the card container and appending to the right card container 
    if (today.isSame(dayjs(task.date), 'day')) {
        taskCard.addClass("card text-white bg-warning mb-3");
    }
    else if (today.isAfter(dayjs(task.date))) {
        taskCard.addClass("card text-white bg-danger mb-3");
    }
    else {
        taskCard.addClass("card text-white bg-success mb-3");
    }

    if (task.progress === "todo") {
        toDo.append(taskCard);
    }
    else if (task.progress === "in-progress") {
        progress.append(taskCard);
    }
    else {
        done.append(taskCard);
    }

    // setting event listner for delete button
    deleteBut.click(() => handleDeleteTask(task.id));

    //TODO
    $('.draggable').draggable({
        containment: "#drag-area", scroll: "false", revert: "invalid",
        start: function(event, ui) {
            $(this).css("z-index", 1000);
        },
        stop: function(event, ui) {
            $(this).css("z-index", "");
        }
    })

    $('.droppable').droppable({
        drop: handleDrop
    })

    return taskCard;
}

// A function to render the task list and make cards draggable
function renderTaskList() {
    for (let i = 0; i < taskList.length; i++) {
        createTaskCard(taskList[i]);
    }
}

// A function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    //taskTitle, date, task
    const taskCard = {
        id: generateTaskId(),
        title: $('#taskTitle').val(),
        date: $('#dueDate').val(),
        description: $('#task').val(),
        progress: 'todo',
    }
    // adding task objects onto the list and storing them in the locale storage
    taskList.push(taskCard);
    localStorage.setItem('tasks', JSON.stringify(taskList));


    //creating a new task card when adding tasks
    createTaskCard(taskCard);

}

// A function to handle deleting a task
function handleDeleteTask(id) {
    //Remove the task from the taskList of objects & storing it in the locale storage
    taskList = taskList.filter((task) => { task.id !== id });
    localStorage.setItem('tasks', JSON.stringify(taskList));
    //Remove the task Card from the Html
    $("#" + id).remove();
}

//A function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();
    
    //We reference the dropped card with this, and reset the css to default.
    const taskCard = $(ui.draggable).css({
        top: 'auto',
        left: 'auto',
        position: 'relative'
    });
    //se the container to know where we dropped the card and to move it there.
    const container = $(this)
    const containerId = container.attr("id")

    //Use the taskId from the card to update its progress value in the taskList
    const taskId = parseInt(taskCard.attr("id"))
    //Searches for the task object in the taskList by its id
    const task = taskList.find((task) => task.id === taskId)
    const progress_before = task.progress

    if (containerId === "todo-cards"){
        task.progress = "todo"
    } else if (containerId === "in-progress-cards"){
        task.progress = "in-progress"
    } else{
        task.progress = "done"
    }
    console.log(`Card moved from ${progress_before} to ${task.progress}`)
    
    // So basically what this does is to changes the parent of the element
    container.append(taskCard)
    
    //Only need to update the new taskList to the local storage.
    localStorage.setItem('tasks', JSON.stringify(taskList));

}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // datepicker
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true
    });

    renderTaskList();
});


// adding event listeners for functions
const modalButton = $('#submit');
modalButton.click(handleAddTask);

const deleteButton = $('')
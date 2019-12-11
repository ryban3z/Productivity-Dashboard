// Local data storage

var data = (localStorage.getItem('toDoList')) ? JSON.parse(localStorage.getItem('toDoList')) : {
	openTasks: [], 
	doneTasks: [] 
}; 


var dailyQuotes = [ 
{
	line: "Do what you can, with what you have, where you are.",
	by: "Theodore Roosevelt"
}, 
{
	line: "Well done is better than well said", 
	by: "Benjamin Franklin"
}, 
{
	line: "Quality is not an act, it is a habit",
	by: "Aristotle"
}
]; 

// Declare key global variables prior to render 
var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs></defs><title>Delete</title><g data-name="Layer"><path class="fill" d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3ZM1,12A11,11,0,1,1,12,23,11,11,0,0,1,1,12Z"/><path class="fill" d="M7.12,16.71a1,1,0,0,1,0-1.42l8.49-8.48A1,1,0,0,1,17,8.22L8.54,16.71A1,1,0,0,1,7.12,16.71Z"/><path class="fill" d="M6.71,6.71a1,1,0,0,1,1.41,0l8.49,8.48a1,1,0,0,1-1.42,1.42L6.71,8.12A1,1,0,0,1,6.71,6.71Z"/></g></svg>'
var completeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs></defs><title>Complete</title><g data-name="Layer"><path class="fill" d="M18.07,8.28A1,1,0,0,1,18,9.65l-7.34,6.87A1.19,1.19,0,0,1,9,16.42L6,13.74a1,1,0,0,1,1.33-1.5L10,14.5l6.68-6.3A1,1,0,0,1,18.07,8.28Z"/><path class="fill" d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3ZM1,12A11,11,0,1,1,12,23,11,11,0,0,1,1,12Z"/></g></svg>'
var list = document.getElementById("pomodoroCount"); 

//On load, we want to get the localStorage and pass it in to the data object so it is not empty 
renderToDoList(); 



// Add and Removing tasks To List - updating data and DOM 

var addButton = document.getElementById("addItem"); // Add new task button 
var task = document.getElementById("inputTask"); // input new task field 


function renderToDoList() {
	if (!data.openTasks.length && !data.doneTasks.length) return; 

	for (var i=0; i < data.openTasks.length; i++) {
		var value = data.openTasks[i]; 
		createListElement(value); 
	}

	for (var j=0; j < data.doneTasks.length; j++) {
		var value = data.doneTasks[j]; 
		createListElement(value, true); 
	}
}

// Update local storage each time task is changed 
function dataObjectUpdated() {
	localStorage.setItem('toDoList',JSON.stringify(data));
}

// User wants to add a new item to the list 
function createListElement(text, doneTasks) { 
	var list = (doneTasks) ? document.getElementById("doneTasks") : document.getElementById("openTasks") //identifies which tasklist to add new item to 

	var item = document.createElement("li"); // Create new list element 
	item.innerText = text; //set input value to the innertext of the element 
	item.setAttribute("contentEditable", "true") //make content editable
	// item.setAttribute("draggable","true"); // make element draggable 
	// item.setAttribute("data-draggable","dragItem"); // gives element target draggability 
		
	//create remove and complete buttons 
	var buttons = document.createElement("div"); //div for both buttons 
	buttons.classList.add('buttonsDiv');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeSVG; 
	remove.addEventListener('click', removeItem); // add click event for removing item

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeSVG; 
	complete.addEventListener('click', completeItem); //add click event for completing item 

	//add buttons to buttons div and list element and append list element to top of tasklist 
	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);
	list.insertBefore(item, list.childNodes[0]);
 }

// User wants to delete a task 
 function removeItem () {
  	var item = this.parentNode.parentNode; 
  	var parent = item.parentNode; 
  	var id = parent.id; 
  	var value = item.innerText;

  	//update data array - rem0ve from data array 
  	if (id === 'openTasks') {
	data.openTasks.splice(data.openTasks.indexOf(value),1);
	} else {
	data.doneTasks.splice(data.openTasks.indexOf(value),1);
	} 

	dataObjectUpdated();  //update local storage 
  	parent.removeChild(item); //apply to DOM 
 }

// User wants to mark task as completed 
function completeItem () {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	//store item in data array and update data object storage 
	if (id === 'openTasks') {
	data.openTasks.splice(data.openTasks.indexOf(value),1);
	data.doneTasks.push(value); 
	} else {
	data.doneTasks.splice(data.openTasks.indexOf(value),1);
	data.openTasks.push(value); 
	}

	dataObjectUpdated(); 

	//check if item should be added to completed or re-added to open tasks 
	var target = (id ==='openTasks') ? document.getElementById('doneTasks'):document.getElementById('openTasks');
	//Moves task from open to completed or vice versa in the DOM 
	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]); 
}

// User wants to add a new item - click 
function appendTaskClick() {
	var value = document.getElementById("inputTask").value; 
	if (value)  {
		data.openTasks.push(value); //store in array 
	 	dataObjectUpdated(); //update data storage 
	 	createListElement(value); //display in DOM 
	 	task.value = ""; //clear input field  
	}
}

// User wants to add a new item - enter 
function appendTaskEnter(e) {
	var value = document.getElementById("inputTask").value; //store input into variable 
	 if (value && e.code === 'Enter') { 
	 	data.openTasks.push(value); //store input value in data object array
	 	dataObjectUpdated(); //update local storage 
	 	createListElement(value); //update the DOM 
	 	task.value = ""; //clear input field 
	} 
}	

addButton.addEventListener("click", appendTaskClick); //event listener for click on add button 
task.addEventListener("keypress", appendTaskEnter); //event listener for enter on input field 

// Functions to count tasks and update counter 
 function openTaskCount () {
  return document.getElementById('openTasks').childElementCount
}

function completedTaskCount () {
	return document.getElementById('doneTasks').childElementCount
}

function updateCount() {
	var count = openTaskCount(); 
	var count2 = completedTaskCount()
	document.getElementById('taskCount').innerHTML = count;
	document.getElementById('doneCount').innerHTML = count2 
}

setInterval(updateCount, 100);
updateCount(); 


// Functions to get the time and date for the header 

function updateDate() {
	var now = new Date(); 
	var year = now.getFullYear();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = months[now.getMonth()]; 
	var day = now.getDate(); 

	dateNow = [day,month,year].join(' ');
	document.getElementById('date').innerHTML = dateNow; 
}
setInterval(updateDate, 1000);
updateDate(); 

function updateTime() {
	var now = new Date();
	var hour = now.getHours();
	var mins = ("0" + now.getMinutes()).slice(-2); 

	timeNow = [hour,mins].join(':');  
	document.getElementById('time').innerHTML = timeNow; 
}

setInterval(updateTime, 1000);
updateTime(); 

// Function to retreive a random quote each day 
let randomQuote = dailyQuotes[Math.floor(Math.random()*dailyQuotes.length)]; 
document.getElementById("dailyQuoteHeader").innerText = "'" + randomQuote.line + "'"; 
document.getElementById("quoteBy").innerText = randomQuote.by; 

// capture Goal of the day for focus 
goal.addEventListener('keypress', goalInputCapture); 

function goalInputCapture(e) {
	var goal = document.getElementById("goal")

	if (goal && e.code === 'Enter') { 
	
		var goalPlace = document.getElementById("goalPlace"); 
		var text = goal.value;

		var goalElement = document.createElement("h4"); 
		goalElement.innerText = text; 
		goalElement.classList.add('goalElement'); 

		goalPlace.appendChild(goalElement); 

		// Remove input field after capturing value 
		goal.remove(0); 
	 } 
}


// NotesList Test
var testArray = ["This is a note about important things", "Here is another note.", "and a third note!"]
for (var i=0; i <testArray.length; i++) {
	document.getElementById("notes").innerHTML += testArray[i]; 
}





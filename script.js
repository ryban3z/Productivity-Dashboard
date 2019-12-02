// Local data storage

var data = {
	openTasks: [], 
	doneTasks: [] 
}; 


// Functions to get the time and date

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

// Add and Removing tasks To List 

var addButton = document.getElementById("addItem"); // Add new task button 
var task = document.getElementById("inputTask"); // input new task field 

// Function to create list item 
function createListElement(text) { 
		var list = document.getElementById("openTasks")

		// Create new list element 
		var item = document.createElement("li");
		item.innerText = text; 
		
		//create remove and complete buttons 
		var buttons = document.createElement("div")
		buttons.classList.add('buttons');

		var remove = document.createElement('button');
		remove.classList.add('remove');
		remove.innerHTML = "X"

		// add click event for removing item
		remove.addEventListener('click', removeItem)

		var complete = document.createElement('button');
		complete.classList.add('complete');
		complete.innerHTML = "Y" 

		//add click event for completing item 
		complete.addEventListener('click', completeItem); 

		buttons.appendChild(remove);
		buttons.appendChild(complete);
		item.appendChild(buttons);

		list.insertBefore(item, list.childNodes[0]);
		task.value = ""; 
		//
 }

// User wants to delete a task 
 function removeItem () {
  	var item = this.parentNode.parentNode
  	var parent = item.parentNode; 
  	parent.removeChild(item);
 }

// User wants to mark task as completed 
function completeItem () {
	var item = this.parentNode.parentNode
	var parent = item.parentNode
	var id = parent.id 
	var value = item.innerText 

	//check if item should be added to completed or re-added to open tasks 
	var target = (id ==='openTasks') ? document.getElementById('doneTasks'):document.getElementById('openTasks');

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]); 

	data.openTasks.splice(data.openTasks.indexOf(value),1);
	data.doneTasks.push(value); 
	console.log(data);  
}

// User wants to add a new item - click 
function appendTaskClick() {
	if (task.value)  {
		data.openTasks.push(task.value); 
	 	createListElement(task.value); 
	}
}

// User wants to add a new item - enter 
function appendTaskEnter() {
	 if (task.value.length > 0 && event.keyCode === 13) { 
	 	data.openTasks.push(task.value); 
	 	createListElement(task.value); 
	} 
}	
// Event listeners for clicks and enter button 
addButton.addEventListener("click", appendTaskClick); 
task.addEventListener("keypress", appendTaskEnter); 

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

// capture Goal of the day for focus 

function goalInputCapture() {
	var goal = document.getElementById("goal")

	if (goal.value.length > 0 && event.keyCode === 13) { 
	
		var goalPlace = document.getElementById("goalPlace"); 
		var text = document.getElementById("goal").value;

		goalElement = document.createElement("h4"); 
		goalElement.innerText = text; 
		goalElement.classList.add('goalElement'); 

		goalPlace.appendChild(goalElement); 

		// Remove input field after capturing value 
		goal.remove(0); 
	 } 

}

goal.addEventListener('keypress', goalInputCapture); 

// Basic pomodoro timer

var myTimer; 
var startButton = document.getElementById("pomodoroStart"); 
var pauseButton = document.getElementById("pomodoroPause"); 
var resetButton = document.getElementById("pomodoroReset"); 

function startTimer () {
	myTimer = setInterval(myClock, 1000);
	var c = 10;

	function myClock () { 
		document.getElementById("timer").innerHTML = --c; 
		console.log(myTimer)
		if (c == 0) {
			clearInterval(myTimer);
			alert ("Your pomodoro session is up! Congrats!")
		}
	}
}

function stopTimer () { 
	clearInterval(myTimer)
}

function resetTimer () {
	var myTimer
}

startButton.addEventListener('click', startTimer); 
pauseButton.addEventListener('click', stopTimer); 
// resetButton.addEventListener('click', resetTimer);

// NotesList Test
var testArray = ["This is a note about important things", "Here is another note.", "and a third note!"]
for (var i=0; i <testArray.length; i++) {
	document.getElementById("notes").innerHTML += testArray[i]; 
}


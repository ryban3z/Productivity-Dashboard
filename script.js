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

// Add Task To List 

// Add task to List - append Child method 

var addButton = document.getElementById("add"); 
var task = document.getElementById("inputTask");
var taskList = document.getElementById("taskList").children[0]; 
var doneTasks = document.getElementById("completedTaskList").children[0]; 

// Function to create list elements 
function createListElement() { 
		var li = document.createElement("li");
		li.classList.add("listItem"); // class for styling 
		li.addEventListener("click", markItemDone); // event listener to move item when completed 
		li.appendChild(document.createTextNode(task.value)); 
		taskList.appendChild(li);
		task.value = ""; 

		function markItemDone() { 
			li.classList.toggle("done"); 
			doneTasks.appendChild(li); 
		}

		var delbtn = document.createElement("button");
		// need to add classes for delbtn and to make it delete parent 
		delbtn.classList.add("delBtn")
		delbtn.appendChild(document.createTextNode("X"));
		li.appendChild(delbtn); 
		delbtn.addEventListener("click",deleteListItem); 

		function deleteListItem() { 
			li.remove(); 
		 }
 }

function appendTaskClick() {
	if (task.value.length > 0)  {
	 createListElement(); 
	}
}

function appendTaskEnter(event) {
	 if (task.value.length > 0 && event.keyCode === 13) { 
	 createListElement(); 
	} 
}	

addButton.addEventListener("click", appendTaskClick); // Event listener for click on add button 
task.addEventListener("keypress", appendTaskEnter); //Event lsitenfer for enter on input 

// Function to count tasks - but doesn't update/reduce because the delete just truns display to none 
 function checkLis(){
  return document.getElementsByTagName('li').length;
}

function updateCount() {
	var count = checkLis(); 
	document.getElementById('itemCount').innerHTML = count; 
}

setInterval(updateCount, 100);
updateCount(); 

// innerHTML method 

// var tasks = [];  

// function displayTaskClick() {
// 	var task = document.getElementById("newTask").value;
// 	 if (task == "" || task == 0)
// 	 	{ return false; }
// 	tasks.push(task);
// 	document.getElementById("taskList").children[0].innerHTML +="<li>"+"<input type='checkbox' class='tickbox'>"+tasks[tasks.length-1]+"<button class='delete'>X</button>"+"</li>";
// }	

// function displayTaskEnter() {
// 	var task = document.getElementById("newTask").value;
// 	 if (task == "" || task == 0)
// 	 	{ return false; }
// 	 else if (event.keyCode === 13){ 
// 	 tasks.push(task);
// 	document.getElementById("taskList").children[0].innerHTML +="<li>"+"<input type='checkbox' class='tickbox'>"+tasks[tasks.length-1]+"<button class='delete'>X</button>"+"</li>";
// 	}
// 	else {return false;}
// }	

// addButton.addEventListener("click", displayTaskClick); // Event listener for click on add button 
// inputEnter.addEventListener("keypress", displayTaskEnter); //Event lsitenfer for enter on input 

// NotesList Test
var testArray = ["This is a note about important things", "Here is another note.", "and a third note!"]
for (var i=0; i <testArray.length; i++) {
	document.getElementById("notes").innerHTML += testArray[i]; 
}


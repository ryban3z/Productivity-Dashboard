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

var tasks = [];  

function displayTask() {
	var task = document.getElementById("newTask").value;
	 if (task == "" || task == 0)
	 	{ return false; }
	 tasks.push(task);
	document.getElementById("taskList").children[0].innerHTML += "<li>"+tasks[tasks.length-1]+"</li>";
	task.value = ""
}	

function displayTask2() {
	var task = document.getElementById("newTask").value;
	 if (task == "" || task == 0)
	 	{ return false; }
	 else if (event.keyCode === 13){ 
	 tasks.push(task);
	document.getElementById("taskList").children[0].innerHTML += "<li>"+tasks[tasks.length-1]+"</li>";
	task.value = ""
	}
	else {return false;}
}	

document.getElementById("add").addEventListener("click",displayTask); 
document.getElementById("newTask").addEventListener("keypress",displayTask2); 

// Store completed tasks

var completedTasks = []; 

// maybe need to use a array.map to move from tasks array to completed 

// NotesList Test
var testArray = ["This is a note about important things", "Here is another note.", "and a third note!"]
document.getElementById("notes").innerHTML = testArray; 

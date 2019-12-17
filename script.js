// Local data storage

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

function goalInputCapture(e) {
	var goal = document.getElementById("goal"); 

	if (goal && e.code === 'Enter') { 
		var appendGoal = document.getElementById("goalInput"); 
		var text = goal.value;

		var goalToday = document.createElement("p"); 
		goalToday.innerText = text; 
		// goalToday.classList.add('goalToday'); 
		goalToday.id = "goalToday"

		var goalButton = document.createElement('button');
		goalButton.innerHTML = "X";
		goalButton.classList.add("goalDelete"); 

		goalToday.appendChild(goalButton); 
		appendGoal.appendChild(goalToday); 

		// Remove input field after capturing value 
		// goal.remove(0); 
		goal.style.display = "none";
	 } 
}

function goalOfDayDelete (e) {
	var goalToday = document.getElementById("goalToday"); 
	var goalParent = goalToday.parentNode; 
	var goal = document.getElementById("goal");
	if (e.target && e.target.className == 'goalDelete') {
		goalParent.removeChild(goalToday);
		goal.style.display = "block"; 
		goal.value = ''; 

	
	}
}

document.addEventListener('click',goalOfDayDelete); 
goal.addEventListener('keypress', goalInputCapture); 








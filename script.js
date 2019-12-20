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

var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs></defs><title>Delete</title><g data-name="Layer"><path class="fill" d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3ZM1,12A11,11,0,1,1,12,23,11,11,0,0,1,1,12Z"/><path class="fill" d="M7.12,16.71a1,1,0,0,1,0-1.42l8.49-8.48A1,1,0,0,1,17,8.22L8.54,16.71A1,1,0,0,1,7.12,16.71Z"/><path class="fill" d="M6.71,6.71a1,1,0,0,1,1.41,0l8.49,8.48a1,1,0,0,1-1.42,1.42L6.71,8.12A1,1,0,0,1,6.71,6.71Z"/></g></svg>'

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

		var goalToday = document.createElement("span"); 
		goalToday.innerText = text; 
		goalToday.classList.add('h6'); 
		goalToday.id = "goalToday"

		var goalButton = document.createElement('button');
		goalButton.innerHTML = removeSVG;
		goalButton.classList.add("goalDelete"); 

		goalToday.appendChild(goalButton); 
		appendGoal.appendChild(goalToday); 

		// Remove input field after capturing value 
		// goal.style.display = "none";
		fadeOut(goal); 
		goal.value = ''; 
	 } 
}

function fadeOut(element) {
	let op = 1 
	let timer = setInterval(function(){
		if (op <= 0.1) {
			clearInterval(timer);
			element.style.display = 'none'; 
		}
		else {
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        	op -= op * 0.1; 
		}
	}, 10)
}

function fadeIn(element) {
	let op = 0.1;   
	element.style.display = 'block';
	let timer = setInterval(function() {
		if (op >= 1) {
			clearInterval(timer);
		}
		else {
			element.style.opacity = op; 
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.1;
		}
	}, 10)
}

function goalOfDayDelete (e) {
	var goalToday = document.getElementById("goalToday"); 
	var goalParent = goalToday.parentNode; 
	var goal = document.getElementById("goal");
	if (e.target && e.target.className == 'goalDelete') {
		goalParent.removeChild(goalToday);
		// goal.style.display = "block"; 
		// goal.style.opacity = 1; 
		// goal.value = ''; 
		fadeIn(goal); 
	}
}

document.addEventListener('click',goalOfDayDelete); 
goal.addEventListener('keypress', goalInputCapture); 








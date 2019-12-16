//local data storage 
let dataPomodoro = (localStorage.getItem('pomodorosToday')) ? JSON.parse(localStorage.getItem("pomodorosToday")) : { }; // asks if there is local storage in pomodorosToday (true), then returns the parsed localstorage otherwise if there is none (false) then returns an empty object
let timePomodoro = (localStorage.getItem('pomodoroTime')) ? JSON.parse(localStorage.getItem("pomodoroTime")) : 1500	; 

// Globa variable declaration 
let myTimer; 
let c = timePomodoro; 
const startButton = document.getElementById("pomodoroStart"); 
const pauseButton = document.getElementById("pomodoroPause"); 
const resetButton = document.getElementById("pomodoroReset"); 
const clearButton = document.getElementById("pomodoroClear");

renderPomodoro(); 

startButton.addEventListener('click', startTimer); 
pauseButton.addEventListener("click", pauseTimer); 
resetButton.addEventListener('click', resetTimer); 
clearButton.addEventListener("click", clearPomodoroCount); 

// Timer start function 
function startTimer () {
	myTimer = setInterval(myClock, 1000);
	startButton.disabled = true; 
	// let c = 10;

	function myClock () { 
		--c 
		let minutes = Math.floor(c/60); 
		let seconds = c - minutes * 60;  
		document.getElementById("timer").innerHTML = minutes +"m" + ' ' + seconds + "s"; 
		
		if (c > 0) {
			localStorage.setItem("pomodoroTime", JSON.stringify(c)); 
		}

		if (c == 0) {
			clearInterval(myTimer);
			document.getElementById("timer").innerHTML = "You just completed a session!";
			createPomodoro(); 
			updatePomodoroCount(); 
			localStorage.removeItem("pomodoroTime"); 
			c = 1500;
			startButton.disabled = false; 
		}
	}
}

// on click clear pomodoro counter and icons 
function clearPomodoroCount() {
	localStorage.removeItem("pomodorosToday"); 
	document.getElementById("pomodoroCount").innerHTML = ''; 
	document.getElementById("pomodoroCounter").innerHTML = '0'; 
}

function resetTimer () { 
	document.getElementById("timer").innerHTML = "Click to start";
	localStorage.removeItem("pomodoroTime"); 
	clearInterval(myTimer); 
	c = 1500; 
	startButton.disabled = false;  
}

function pauseTimer () {
	clearInterval(myTimer); 
	startButton.disabled = false;  
}
// Create a pomodoro icon 
function createPomodoro() { 
	var newPomodoro = document.createElement('img');
	newPomodoro.setAttribute("src","assets/tomato.svg");
	newPomodoro.classList.add("pomodoroIcon2"); 
	list.appendChild(newPomodoro);
}

// Update counter for pomodoros and local storage 
function updatePomodoroCount () {
	var count = document.getElementById('pomodoroCount').childElementCount;
	document.getElementById("pomodoroCounter").innerHTML = count;
	dataPomodoro = count; 
	localStorage.setItem('pomodorosToday', JSON.stringify(count)); 
}
// Show pomodoro count, icons and time remaining on load 
function renderPomodoro() {
	if (!dataPomodoro) return; 
	for (var i=0; i < dataPomodoro; i++) {
		createPomodoro(); 
		var count = document.getElementById('pomodoroCount').childElementCount;
		document.getElementById("pomodoroCounter").innerHTML = count;
	}
	if (!timePomodoro) return; 
		let minutes = Math.floor(c/60); 
		let seconds = c - minutes * 60;  
		document.getElementById("timer").innerHTML = minutes +"m" + ' ' + seconds + "s";  
}




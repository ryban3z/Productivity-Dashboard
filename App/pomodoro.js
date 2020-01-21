//local data storage 
let dataPomodoro = (localStorage.getItem('pomodorosToday')) ? JSON.parse(localStorage.getItem("pomodorosToday")) : 0; // asks if there is local storage in pomodorosToday (true), then returns the parsed localstorage otherwise if there is none (false) then returns an empty object
let timePomodoro = (localStorage.getItem('pomodoroTime')) ? JSON.parse(localStorage.getItem("pomodoroTime")) : 3; 

// Global variable declaration 
let myTimer; 
let c = timePomodoro; 
let p = dataPomodoro
const startButton = document.getElementById("pomodoroStart"); 
const pauseButton = document.getElementById("pomodoroPause"); 
const resetButton = document.getElementById("pomodoroReset"); 
const clearButton = document.getElementById("pomodoroClear"); 
const timer = document.getElementById("timer"); 
const counter = document.getElementById("pomodoroCounter"); 

renderPomodoro(); 

startButton.addEventListener('click', startTimer);  
pauseButton.addEventListener("click", pauseTimer); 
resetButton.addEventListener('click', resetTimer); 
clearButton.addEventListener("click", clearPomodoroCount); 

// Timer start function 
function startTimer () {
	myTimer = setInterval(myClock, 1000);
	startButton.style.display = 'none';
	pauseButton.style.display = 'initial';  

	function myClock () { 
		--c 
		let minutes = Math.floor(c/60); 
		let seconds = c - minutes * 60;  
		timer.innerHTML = minutes +"m" + ' ' + seconds + "s"; 
		
		if (c > 0) {
			localStorage.setItem("pomodoroTime", JSON.stringify(c)); 
		}

		if (c == 0) {
			clearInterval(myTimer);
			timer.innerHTML = "Complete!";
			updatePomodoroCount(); 
			localStorage.removeItem("pomodoroTime"); 
			c = 1500; 
			startButton.style.display = 'initial'; 
			pauseButton.style.display = 'none'; 
		}
	}
}

// on click clear pomodoro counter and icons 
function clearPomodoroCount() {
	localStorage.removeItem("pomodorosToday"); 
	counter.innerHTML = '0'; 
}

function resetTimer () { 
	timer.innerHTML = "25m 0s";
	localStorage.removeItem("pomodoroTime"); 
	clearInterval(myTimer); 
	c = 1500; 
	pauseButton.style.display = 'none'; 
	startButton.style.display = 'initial';  
}

function pauseTimer () {
	clearInterval(myTimer);  
	pauseButton.style.display = 'none';
	startButton.style.display = 'initial'; 
}

// Update counter for pomodoros and local storage 
function updatePomodoroCount () {
	p++; 
	localStorage.setItem("pomodorosToday", JSON.stringify(p));
	counter.innerHTML = p; 
}
// Show pomodoro count, icons and time remaining on load 
function renderPomodoro() {
	if (dataPomodoro == 0) {
		counter.innerHTML = "none";
	} else {
		counter.innerHTML = p; 
	}
	
	if (!timePomodoro) return; 
		let minutes = Math.floor(c/60); 
		let seconds = c - minutes * 60;  
		timer.innerHTML = minutes +"m" + ' ' + seconds + "s";  
}




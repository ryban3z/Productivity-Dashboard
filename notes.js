// NotesList 
let userNotes = (localStorage.getItem('userNotes')) ? JSON.parse(localStorage.getItem("userNotes")) : []; 

let noteCapture = document.getElementById("noteCapture"); 
let noteTextArea = document.getElementById("noteText"); 
let noteList = document.getElementById("notes"); 
let clearNotes = document.getElementById("clearNotes"); 

//function to renderNotes on load

const renderNotes = () => {
	if(!userNotes) return; 
	for (i=0; i < userNotes.length; i++) {
		createNote(userNotes[i]); 
	}
}

//function to capture note text 
const addNote = () => {
	let text = noteTextArea.value; 
	if (text) {
		userNotes.push(text);
		notesObjectUpdated();  
		createNote(text);  
		noteTextArea.value = '';
	}
}

const createNote = (text) => {
	let newNote = document.createElement("li");
		newNote.innerText = text; 
		newNote.classList.add("noteCard");
		newNote.setAttribute('contentEditable', 'true');
		noteList.appendChild(newNote); 
}

const clearNote = () => {
	localStorage.removeItem('userNotes'); 
	let node = document.getElementById("notes"); 
	node.innerHTML = "";
}

const notesObjectUpdated = () => {
	localStorage.setItem('userNotes', JSON.stringify(userNotes)); 
}


noteCapture.addEventListener("click", addNote); 
clearNotes.addEventListener("click",clearNote)

renderNotes(); 


// Search bar functionality

//take an input, normalise it to lowercase, 


let searchInput = document.getElementById("searchInput").value; 
console.log(document.getElementById("searchInput").value); 
let lowercaseInput = searchInput.toLowerCase(); 

let checkSearch = userNotes.includes("lowercaseInput"); 
console.log(checkSearch)
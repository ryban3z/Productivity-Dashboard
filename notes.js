// NotesList 
let notesData = (localStorage.getItem('notesData')) ? JSON.parse(localStorage.getItem("notesData")) : []; 

// localStorage.setItem("notesData",JSON.stringify(notesData));
// let notesDataParsed = JSON.parse(localStorage.getItem('notesData'));
// console.log(notesDataParsed); 
// console.log(notesDataParsed[0].title)
// console.log(notesDataParsed[0].text)


let noteCapture = document.getElementById("noteCapture"); 
let noteTextArea = document.getElementById("noteText"); 
let noteList = document.getElementById("notes"); 
let clearNotes = document.getElementById("clearNotes"); 

//function to capture note text 
const addNote = () => {
	let title= document.getElementById("noteTitle").value; 
	let text = noteTextArea.value; 
	if (text) {
		let obj = {};
		obj["title"] = title;
		obj["text"] = text; 
		notesData.push(obj); 
		notesObjectUpdated();  
		createNote(title, text);  
		noteTextArea.value = '';
		document.getElementById("noteTitle").value = ''; 
	}
}

const notesObjectUpdated = () => {
	localStorage.setItem("notesData",JSON.stringify(notesData)); //store data locally ; 
}

const createNote = (title, text) => {
	let newNote = document.createElement("li");
	let newTitle = document.createElement("h6");
	let cardBody = document.createElement("div"); 
	let card = document.createElement("div"); 
		card.classList.add("card", "mb-1")
		cardBody.classList.add("card-body"); 
		newTitle.innerText = title
		newNote.innerText = text; 
		newNote.classList.add("noteCard", "card-text");
		newTitle.classList.add("card-title"); 
		cardBody.appendChild(newTitle); 
		cardBody.appendChild(newNote); 
		card.appendChild(cardBody);
		// newNote.setAttribute('contentEditable', 'true');
		noteList.appendChild(card); 
}

const clearNote = () => {
	localStorage.removeItem('notesData'); 
	notesData = []; 
	let node = document.getElementById("notes"); 
	node.innerHTML = "";
}

noteCapture.addEventListener("click", addNote); 
clearNotes.addEventListener("click",clearNote); 

//function to renderNotes on load
const renderNotes = () => {
	if (!notesData) return;
	for (i=0; i < notesData.length; i++) {
		createNote(notesData[i].title,notesData[i].text); 
	}
}

// renderNotes2(); 
renderNotes(); 

// Search bar functionality

function filterItems(array, query) {
	return array.filter(function(element) {
		return element.toLowerCase().indexOf(query.toLowerCase()) !== -1;
	})
}

function searchNotes() {
	input = document.getElementById("searchInput").value;
	let result = filterItems(userNotes,input);
	console.log(result); 
}

const searchBar = document.getElementById("searchInput"); 
searchBar.addEventListener("keyup",searchNotes); 

function searchNotes(event) {
	const term = event.target.value.toLowerCase(); 
	const notes = noteList.getElementsByTagName("li"); 
	Array.from(notes).forEach(function(note){
		const content = note.textContent;
		if(content.toLowerCase().indexOf(term)!= -1){
			note.style.display="";	
		} else {
			note.style.display="none";
		}
	})
}






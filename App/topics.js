var topics = (localStorage.getItem('topicsData')) ? JSON.parse(localStorage.getItem("topicsData")) : [];

const btnClass = ["btn-outline-primary", "btn-outline-secondary", "btn-outline-success", "btn-outline-danger", "btn-outline-dark", "btn-outline-warning", "btn-outline-info"]

const addTopicInput = document.getElementById("addTopic");
const topicList = document.getElementById("topicList");
const clearTopic = document.getElementById("clearTopic"); 

function addTopic(e) {
    var topic = addTopicInput.value;
    if (topic && e.code === 'Enter') {
        createTopic(topic); 
        topics.push(topic); 
        topicsArrayStored(); 
        addTopicInput.value = '';   
    } 
}; 

function createTopic (topic) {
    let newTopic = document.createElement("button");
        newTopic.classList.add("btn", "mx-1", "d-block", "my-1");
        let randomClass = btnClass[Math.floor(Math.random()*btnClass.length)]; 
        newTopic.classList.add(randomClass); 
        newTopic.innerHTML = topic;
        topicList.appendChild(newTopic);
}

const topicsArrayStored = () => {
    localStorage.setItem("topicsData", JSON.stringify(topics))
}

function renderTopics() {
    if (!topics) return;
    for (i=0; i < topics.length; i++) {
        createTopic(topics[i]); 
    }
}; 

renderTopics(); 

function clearTopics() {
    localStorage.removeItem("topicsData"); 
    topics = []; 
    topicList.innerHTML = ''; 
}; 

addTopicInput.addEventListener("keypress", addTopic);
clearTopic.addEventListener("click", clearTopics); 
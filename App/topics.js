var topics = (localStorage.getItem('topicsData')) ? JSON.parse(localStorage.getItem("topicsData")) : [];

const addTopicInput = document.getElementById("addTopic");
const topicList = document.getElementById("topicList");
const clearTopic = document.getElementById("clearTopic"); 

function addTopic(e) {
    var topic = addTopicInput.value;
    if (topic && e.code === 'Enter') {
        createTopic2(topic); 
        topics.push(topic); 
        topicsArrayStored(); 
        addTopicInput.value = '';   
    } 
}; 

function createTopic (topic) {
    let newTopic = document.createElement("button");
        newTopic.classList.add("btn", "d-block", "my-1", "btn-block", "btn-outline-info");
        newTopic.innerHTML = topic;
        topicList.appendChild(newTopic);
}

function createTopic2 (topic) {
    let topicBody = document.createElement("div");
    topicBody.classList.add("container", "border", "topicItem")
    let topicContent = document.createElement("p"); 
    topicContent.innerHTML = topic; 
    topicBody.appendChild(topicContent)
    topicList.appendChild(topicBody); 
}

const topicsArrayStored = () => {
    localStorage.setItem("topicsData", JSON.stringify(topics))
}

function renderTopics() {
    if (!topics) return;
    for (i=0; i < topics.length; i++) {
        createTopic2(topics[i]); 
    }
}; 

function clearTopics() {
    localStorage.removeItem("topicsData"); 
    topics = []; 
    topicList.innerHTML = ''; 
}; 

renderTopics(); 

addTopicInput.addEventListener("keypress", addTopic);
clearTopic.addEventListener("click", clearTopics); 
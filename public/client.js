
const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message_area');

do {
    name = prompt("Please Enter Your Name: ");
} while (!name);

textarea.addEventListener('keyup',(e) => {
    if(e.key == 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message:message.trim()
    }

    //append 
    appendMessage(msg,'outgoing')
    textarea.value=""
    scrollToBottom()

    //send to server 
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type;
   
    mainDiv.classList.add(className,'message')
   // mainDiv.addEventListener(className,'message')

   let currentdate = new Date();
   let hours = currentdate.getHours();
   const ampm = hours>=12?'PM':'AM';
   const f = hours%12 || 12;
   //console.log(`${f}:${currentdate.getMinutes()} ${ampm}`);


    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    <h6>${`${f}:${currentdate.getMinutes()} ${ampm}`}</h6>
    `

    mainDiv.innerHTML = markup;

    messagearea.appendChild(mainDiv);
}

//recieved message 
socket.on('message',(msg) =>{
appendMessage(msg,'incomming')
scrollToBottom()
})

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight
}
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const chatOverlay = document.getElementById("chatOverlay");
const closeChatBtn = document.getElementById("closeChatBtn");
const sendChatBtn = document.getElementById("sendChatBtn");
const ctaBtn = document.getElementById("ctaBtn");

let step = 0;
const userData = { name:"", age:"", location:"", email:"", grievance:"" };

function openChat(){
  if(!chatOverlay) return;
  chatOverlay.classList.add("is-open");
  chatOverlay.setAttribute("aria-hidden","false");
  if(chatBox && chatBox.innerHTML.trim()===""){
    setTimeout(()=>addBotMessage("Hey! I'm EVA ⚡ Your Digital Guardian. What's your name?"),350);
  }
  setTimeout(()=>userInput && userInput.focus(),450);
}
function closeChat(){
  if(!chatOverlay) return;
  chatOverlay.classList.remove("is-open");
  chatOverlay.setAttribute("aria-hidden","true");
}
function addBotMessage(message){
  if(!chatBox) return;
  const el=document.createElement("div"); el.className="message bot-message"; el.innerText=message;
  chatBox.appendChild(el); scrollChat();
}
function addUserMessage(message){
  if(!chatBox) return;
  const el=document.createElement("div"); el.className="message user-message"; el.innerText=message;
  chatBox.appendChild(el); scrollChat();
}
function scrollChat(){ if(chatBox) chatBox.scrollTop=chatBox.scrollHeight; }
function sendMessage(){
  if(!userInput) return;
  const message=userInput.value.trim(); if(!message) return;
  addUserMessage(message); userInput.value=""; processConversation(message);
}
function processConversation(message){
  if(step===0){ userData.name=message; step=1; setTimeout(()=>addBotMessage(`Nice to meet you, ${userData.name}! 😊 How old are you?`),500); }
  else if(step===1){ userData.age=message; step=2; setTimeout(()=>addBotMessage("Where are you currently located?"),500); }
  else if(step===2){ userData.location=message; step=3; setTimeout(()=>addBotMessage("What is your email address?"),500); }
  else if(step===3){ userData.email=message; step=4; setTimeout(()=>addBotMessage(`Thank you, ${userData.name}. 💙 So... tell me. How can EVA help you?`),500); }
  else if(step===4){
    userData.grievance=message; step=5; addBotMessage("⚡ Signal received. EVA is transmitting your request...");
    setTimeout(()=>{ if(typeof sendEmail==="function") sendEmail(); else addBotMessage("⚠️ EVA detected a transmission problem."); },1200);
  }
}

if(sendChatBtn) sendChatBtn.addEventListener("click",sendMessage);
if(closeChatBtn) closeChatBtn.addEventListener("click",closeChat);
if(userInput) userInput.addEventListener("keydown",e=>{if(e.key==="Enter") sendMessage();});
if(ctaBtn) ctaBtn.addEventListener("click",openChat);

/* ENTRY BEHAVIOUR: visitor sees the superhero, then EVA opens as the conversation. */
const AUTO_OPEN_DELAY_MS = 2000;
window.addEventListener("load",()=>setTimeout(openChat,AUTO_OPEN_DELAY_MS));

const chatBox = document.getElementById("chatBox");

const userInput = document.getElementById("userInput");

const chatOverlay = document.getElementById("chatOverlay");


let step = 0;


const userData = {

    name: "",

    age: "",

    location: "",

    email: "",

    grievance: ""

};


/* OPEN CHAT */


function openChat() {

    chatOverlay.style.display = "flex";


    if (chatBox.innerHTML === "") {

        setTimeout(() => {

            addBotMessage(
                "Hey! I'm EVA ⚡ Your Digital Guardian. What's your name?"
            );

        }, 500);

    }


    setTimeout(() => {

        userInput.focus();

    }, 100);

}


/* CLOSE CHAT */


function closeChat() {

    chatOverlay.style.display = "none";

}


/* ADD EVA MESSAGE */


function addBotMessage(message) {

    const messageDiv =
        document.createElement("div");


    messageDiv.className =
        "message bot-message";


    messageDiv.innerText =
        message;


    chatBox.appendChild(messageDiv);


    scrollChat();

}


/* ADD USER MESSAGE */


function addUserMessage(message) {

    const messageDiv =
        document.createElement("div");


    messageDiv.className =
        "message user-message";


    messageDiv.innerText =
        message;


    chatBox.appendChild(messageDiv);


    scrollChat();

}


/* AUTO SCROLL */


function scrollChat() {

    chatBox.scrollTop =
        chatBox.scrollHeight;

}


/* SEND MESSAGE */


function sendMessage() {

    const message =
        userInput.value.trim();


    if (message === "") {

        return;

    }


    addUserMessage(message);


    userInput.value = "";


    processConversation(message);

}


/* PRESS ENTER */


userInput.addEventListener(

    "keydown",

    function (event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }

);


/* CONVERSATION */


function processConversation(message) {


    /* NAME */


    if (step === 0) {

        userData.name = message;

        step = 1;


        setTimeout(() => {

            addBotMessage(
                `Nice to meet you, ${userData.name}! 😊 How old are you?`
            );

        }, 500);

    }


    /* AGE */


    else if (step === 1) {

        userData.age = message;

        step = 2;


        setTimeout(() => {

            addBotMessage(
                "Where are you currently located?"
            );

        }, 500);

    }


    /* LOCATION */


    else if (step === 2) {

        userData.location = message;

        step = 3;


        setTimeout(() => {

            addBotMessage(
                "What is your email address?"
            );

        }, 500);

    }


    /* EMAIL */


    else if (step === 3) {

        userData.email = message;

        step = 4;


        setTimeout(() => {

            addBotMessage(
                `Thank you, ${userData.name}. 💙 So... tell me. How can EVA help you?`
            );

        }, 500);

    }


    /* GRIEVANCE */


    else if (step === 4) {

        userData.grievance = message;

        step = 5;


        addBotMessage(
            "⚡ Signal received. EVA is transmitting your request..."
        );


        setTimeout(() => {

            sendEmail();

        }, 1200);

    }

}


/* SEND EMAIL */



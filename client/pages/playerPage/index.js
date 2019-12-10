const socket = io();

const nameInput = document.getElementsByClassName("team-name-input")[0];
const nameGroup = document.getElementsByClassName("team-name-group")[0];
const answerGroup = document.getElementsByClassName("answer-group")[0];

const loginButton = document.getElementsByClassName("login-button")[0];
const logoutButton = document.getElementsByClassName("logout-button")[0];
const answerButton = document.getElementsByClassName("answer-button")[0];

let name = "";
let ready = false;

const onLoginClick = e => {    
    const inputValue = nameInput.value;
    if (!inputValue || !inputValue.trim()) return;
    name = inputValue;
    nameGroup.classList.add("hidden");
    answerGroup.classList.remove("hidden");
}

const onLogoutClick = e => {
    nameGroup.classList.remove("hidden");
    answerGroup.classList.add("hidden");
}

const onAnswerClick = e => ready && socket.emit("answer", name);

loginButton.addEventListener("click", onLoginClick);
logoutButton.addEventListener("click", onLogoutClick);
answerButton.addEventListener("click", onAnswerClick);

socket.on('ready', isReady => (ready = isReady));



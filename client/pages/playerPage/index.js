'use strict'

const nameInput = document.getElementsByClassName("team-name-input")[0];
const nameGroup = document.getElementsByClassName("team-name-group")[0];
const answerGroup = document.getElementsByClassName("answer-group")[0];

const loginButton = document.getElementsByClassName("login-button")[0];
const logoutButton = document.getElementsByClassName("logout-button")[0];
const answerButton = document.getElementsByClassName("answer-button")[0];

const onLoginClick = e => {
    e.preventDefault();
    e.stopPropagation();
    
    const inputValue = nameInput.value;
    if (!inputValue || !inputValue.trim()) return;
    console.log(inputValue);
    nameGroup.classList.add("hidden");
    answerGroup.classList.remove("hidden");
}

const onLogoutClick = e => {
    e.preventDefault();
    e.stopPropagation();

    nameGroup.classList.remove("hidden");
    answerGroup.classList.add("hidden");
}

const onAnswerClick = e => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Click");
}

loginButton.addEventListener("click", onLoginClick);
logoutButton.addEventListener("click", onLogoutClick);
answerButton.addEventListener("click", onAnswerClick);


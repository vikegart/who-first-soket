const socket = io();

const main = document.getElementsByClassName("main")[0];
const nameGroup = document.getElementsByClassName("team-name")[0];
const answerGroup = document.getElementsByClassName("answer-group")[0];

const actionButton = document.getElementsByClassName("action-button")[0];
const yesButton = document.getElementsByClassName("yes-button")[0];
const noButton = document.getElementsByClassName("no-button")[0];

window.history.replaceState({}, '','/hoster'); //hide the real url
window.history.replaceState({}, '','🐬'); //hide the real url


const statesMap = {
    wait: "wait",
    inProgress: "in-progress",
    ready: "ready"
}

let state = statesMap.wait;
let teamsTried = []; 

const switchState = newState => {
    main.classList.remove(state);
    state = newState;
    main.classList.add(state);
    if (newState === statesMap.inProgress) {
        answerGroup.classList.remove("hidden");
        actionButton.classList.add("hidden");
    } else {
        answerGroup.classList.add("hidden");
        actionButton.classList.remove("hidden");
        socket.emit("ready", state === statesMap.ready);
    }
}

const handlersMap = {
    [statesMap.wait]: () => {
        switchState(statesMap.ready);
        nameGroup.innerHTML = "Ждем ответа!";
    },
    [statesMap.ready]: () => {
        switchState(statesMap.wait);
        teamsTried = [];
        nameGroup.innerHTML = " ";
    },
    [statesMap.inProgress]: isRightAnswer => {
        if (isRightAnswer) {
            switchState(statesMap.wait);
            teamsTried = [];
            nameGroup.innerHTML = " ";
        } else {
            switchState(statesMap.ready);
            nameGroup.innerHTML = "Ждем ответа!";
        }
    },
}

actionButton.addEventListener('click', e => handlersMap[state]());
yesButton.addEventListener('click', e => handlersMap[state](true));
noButton.addEventListener('click', e => handlersMap[state](false));

socket.on('answer', teamName => {
    if (state !== statesMap.ready) return;
    if (teamsTried.includes(teamName)) return socket.emit('tried', teamName);
    switchState(statesMap.inProgress);
    teamsTried.push(teamName);
    nameGroup.innerHTML = `Отвечает команда \"${teamName}\"`;
});



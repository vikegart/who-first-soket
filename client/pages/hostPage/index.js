'use strict'

const main = document.getElementsByClassName("main")[0];
const nameGroup = document.getElementsByClassName("team-name")[0];

const actionButton = document.getElementsByClassName("action-button")[0];
const statesMap = {
    wait: "wait",
    inProgress: "in-progress",
    ready: "ready"
}

let state = statesMap.wait;

const switchState = newState => {
    main.classList.remove(state);
    state = newState;
    main.classList.add(state);
}

const handlersMap = {
    [statesMap.wait]: e => {
        switchState(statesMap.ready);
        nameGroup.innerHTML = "Ждем ответа!";
    },
    [statesMap.ready]: e => {
        switchState(statesMap.inProgress);
        nameGroup.innerHTML = "Отвечает команда \"Шлакоблокунь\"";
    },
    [statesMap.inProgress]: e => {
        switchState(statesMap.wait);
        nameGroup.innerHTML = " ";
    },
}

const onActionClick = e => {
    e.preventDefault();
    e.stopPropagation();

    handlersMap[state](e);
}


actionButton.addEventListener("click", onActionClick);


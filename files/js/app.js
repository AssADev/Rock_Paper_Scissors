// Variables :
let userScore = 0;
let computerScore = 0;

let userScoreboard = document.getElementById("userscoreboard");
let computerScoreboard = document.getElementById("computerscoreboard");

const choices = document.querySelectorAll(".object");
const computer_pick = ["Meteorite", "Star", "Rocket"];

let computerChoiceTitle = document.querySelector(".computer_choice h3");
let lastComputerChoice = document.querySelector(".last_choice h3");
let lastChoice = "";
let updateComputerRound = 0;

const start_round_btn = document.getElementById("launch_round");
const reset_btn = document.getElementById("reset_btn");

const actions_logs = document.querySelector(".actions");

// Logs :
let logs = {
    win_round: "You won this round",
    lose_round: "You lost this round",
    equal_round: "There is equality",
    win_game: "You beat the AI",
    lose_game: "You were beaten by the AI",
};

// Choices :
choices.forEach((choice) =>
    choice.addEventListener("click", function () {
        if (document.querySelector(".object.active") !== null) {
            document.querySelector(".object.active").classList.remove("active");
        }
        this.classList.add("active");
    })
);

// Play Function :
start_round_btn.addEventListener("click", () => {
    if (document.querySelector(".object.active") == null || userScore >= 5 || computerScore >= 5) {
        return;
    }

    // Check who win :
    let userChoice = userPlay();
    let computerChoice = computerPlay();
    let infos_logs = "";

    if (userChoice === computerChoice) {
        infos_logs = `${logs.equal_round} (${userChoice} - ${computerChoice})`;
        actions_logs.innerHTML += `<p><i class="fas fa-equals"></i> ${infos_logs}</p>`;
    }
    if (
        (userChoice === "Meteorite" && computerChoice === "Rocket") ||
        (userChoice === "Star" && computerChoice === "Meteorite") ||
        (userChoice === "Rocket" && computerChoice === "Star")
    ) {
        infos_logs = `${logs.win_round} (${userChoice} - ${computerChoice})`;
        actions_logs.innerHTML += `<p><i class="fas fa-check"></i> ${infos_logs}</p>`;
        counterWin();
    }
    if (
        (userChoice === "Rocket" && computerChoice === "Meteorite") ||
        (userChoice === "Meteorite" && computerChoice === "Star") ||
        (userChoice === "Star" && computerChoice === "Rocket")
    ) {
        infos_logs = `${logs.lose_round} (${userChoice} - ${computerChoice})`;
        actions_logs.innerHTML += `<p><i class="fas fa-times"></i> ${infos_logs}</p>`;
        counterLose();
    }

    updateComputer(computerChoice);
});

// Check choices :
function computerPlay() {
    return computer_pick[Math.floor(Math.random() * computer_pick.length)];
}

function userPlay() {
    let userChoice = document.querySelector(".object.active");
    if (userChoice == undefined || null) {
        return;
    }
    let choice = document.querySelector(".object.active h3");
    return choice.innerText;
}

// Counter :
function counterWin() {
    userScore++;
    userScoreboard.innerText = userScore;
    if (userScore == 5) {
        actions_logs.innerHTML += `<p><i class="fas fa-user-astronaut"></i> ${logs.win_game} (${userScore} - ${computerScore})</p>`;
    }
}

function counterLose() {
    computerScore++;
    computerScoreboard.innerText = computerScore;
    if (computerScore == 5) {
        actions_logs.innerHTML += `<p><i class="fas fa-robot"></i> ${logs.lose_game} (${userScore} - ${computerScore})</p>`;
    }
}

// AI Panels :
function updateComputer(computerChoice) {
    computerChoiceTitle.innerHTML = computerChoice;
    computerChoiceTitle.id = computerChoice.toLowerCase();

    if (updateComputerRound != 0) {
        lastComputerChoice.innerHTML = lastChoiceText;
        lastComputerChoice.id = lastChoiceID;
    }
    lastChoiceText = computerChoiceTitle.innerText;
    lastChoiceID = computerChoiceTitle.id;
    updateComputerRound++;
}

// Reset :
reset_btn.addEventListener("click", () => {
    [userScore, computerScore] = [0, 0];
    [userScoreboard.innerText, computerScoreboard.innerText] = [userScore, computerScore];
    actions_logs.innerHTML = "";
});

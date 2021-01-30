// Variables :
let userScore = 0;
let computerScore = 0;

let userScoreboard = document.getElementById("userscoreboard");
let computerScoreboard = document.getElementById("computerscoreboard");

const choices = document.querySelectorAll(".object");
const start_round_btn = document.getElementById("launch_round");
const reset_btn = document.getElementById("reset_btn");

const actions_logs = document.querySelector(".actions");
const computer_pick = ["Meteorite", "Star", "Rocket"];

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
    if (document.querySelector(".object.active") == null || userScore == 3 || computerScore == 3) {
        return;
    }

    // Check who win :
    let userChoice = userPlay();
    let computerChoice = computerPlay();
    if (userChoice === computerChoice) {
        let infos_logs = `${logs.equal_round} (${userChoice} - ${computerChoice})`;
        actions_logs.innerHTML += `<p><i class="fas fa-equals"></i> ${infos_logs}</p>`;
    }
    if (
        (userChoice === "Meteorite" && computerChoice === "Rocket") ||
        (userChoice === "Star" && computerChoice === "Meteorite") ||
        (userChoice === "Rocket" && computerChoice === "Star")
    ) {
        let infos_logs = `${logs.win_round} (${userChoice} - ${computerChoice})`;
        actions_logs.innerHTML += `<p><i class="fas fa-check"></i> ${infos_logs}</p>`;
        counterWin();
    }
    if (
        (userChoice === "Rocket" && computerChoice === "Meteorite") ||
        (userChoice === "Meteorite" && computerChoice === "Star") ||
        (userChoice === "Star" && computerChoice === "Rocket")
    ) {
        let infos_logs = `${logs.lose_round} (${userChoice} - ${computerChoice})`;
        actions_logs.innerHTML += `<p><i class="fas fa-times"></i> ${infos_logs}</p>`;
        counterLose();
    }
});

function computerPlay() {
    let randomElement = computer_pick[Math.floor(Math.random() * computer_pick.length)];
    return randomElement;
}

function userPlay() {
    let userChoice = document.querySelector(".object.active");
    if (userChoice == undefined || null) {
        return;
    }
    let choice = document.querySelector(".object.active h3");
    return choice.innerText;
}

function counterWin() {
    userScore++;
    userScoreboard.innerText = userScore;
    if (userScore == 3) {
        actions_logs.innerHTML += `<p><i class="fas fa-user-astronaut"></i> ${logs.win_game} (${userScore} - ${computerScore})</p>`;
    }
}

function counterLose() {
    computerScore++;
    computerScoreboard.innerText = computerScore;
    if (computerScore == 3) {
        actions_logs.innerHTML += `<p><i class="fas fa-robot"></i> ${logs.lose_game} (${userScore} - ${computerScore})</p>`;
    }
}

// Reset :
reset_btn.addEventListener("click", () => {
    [userScore, computerScore] = [0, 0];
    [userScoreboard.innerText, computerScoreboard.innerText] = [userScore, computerScore];
    actions_logs.innerHTML = "";
});

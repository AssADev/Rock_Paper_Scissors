// Start game :
const start_btn = document.getElementById("start");
const back_btn = document.getElementById("back_btn");

start_btn.addEventListener("click", () => {
    document.body.classList.add("ingame");
});

back_btn.addEventListener("click", () => document.body.classList.remove("ingame"));

// Choices :
const choices = document.querySelectorAll(".object");

choices.forEach((choice) =>
    choice.addEventListener("click", function () {
        if (document.querySelector(".object.active") !== null) {
            document.querySelector(".object.active").classList.remove("active");
        }
        this.classList.add("active");
    })
);

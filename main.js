// Setting Game Name
const gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created by Mahmoud Said`;

// Setting Game Options
let numberOfGuesses = 6;
let numberOfLetters = 6;
let currentTry = 1;

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  // Create Main Try Div
  for (let i = 1; i <= numberOfGuesses; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    // Creating Inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      // input.maxLength = 1;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  // Disable All Inputs Except The First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    //Convert Input Values To Uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target); //or this
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

window.onload = function () {
  generateInput();
};

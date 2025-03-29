// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Elzero Web School`;

// Setting Game Options
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Flight",
  "School",
  "bright",
  "system",
  "laptop",
  "cipher",
  "dynamo",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  // Create Main Try Div
  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    // Create Inputes
    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  // Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert Input To Uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // Or this
      // console.log(currentIndex);
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

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

console.log(wordToGuess);

function handleGuesses() {
  let successGuess = true;
  console.log(wordToGuess);
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      // Letter Is Correct And In Place
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // Letter Is Correct And Not In Place
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("incorrect");
      successGuess = false;
    }
  }
  // Check If User Win or Not
  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is : <span>${wordToGuess}</span>`;
    // Disable All Inputs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.remove("disabled-inputs"));
    guessButton.disabled = true;
  } else {
  }
}
window.onload = function () {
  generateInput();
};

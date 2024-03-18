let words = JSON.parse(localStorage.getItem("hangman_words")) || ["car"];
let selectedWord = "";
let guessedWord = [];
let wrongGuessCount = 0;

function showWords() {
  let wordsContainer = document.getElementById("words-container");
  let wordsList = document.getElementById("words-list");

  if (wordsContainer.style.display === "none") {
    wordsContainer.style.display = "block";
    wordsList.innerHTML = "";
    words.forEach((word) => {
      let listItem = document.createElement("li");
      listItem.textContent = word;

      let deleteButton = document.createElement("span");
      deleteButton.textContent = " ❌";
      deleteButton.style.cursor = "pointer";
      deleteButton.onclick = function () {
        deleteWord(word);
      };

      listItem.appendChild(deleteButton);

      wordsList.appendChild(listItem);
    });
  } else {
    wordsContainer.style.display = "none";
  }
}

function newGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(selectedWord.length).fill("*");
  wrongGuessCount = 0;
  renderGame();
}

function renderGame() {
  document.getElementById("word-display").textContent = guessedWord.join(" ");
  document.getElementById("guess-count").textContent = wrongGuessCount;
}

function guessLetter() {
  let guessInput = document.getElementById("guess-input");
  let guess = guessInput.value.toLowerCase();

  if (guess.length === 1 && /^[a-z]+$/.test(guess)) {
    if (selectedWord.includes(guess)) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guess) {
          guessedWord[i] = guess;
        }
      }
    } else {
      wrongGuessCount++;
    }

    guessInput.value = "";
    renderGame();

    if (guessedWord.join("") === selectedWord) {
      alert("Congratulations, You Guessed the Word!");
      newGame();
    } else if (wrongGuessCount >= 5) {
      alert("You Lost! Correct Word: " + selectedWord);
      newGame();
    }
  } else {
    alert("Please enter only one letter!");
  }
}

window.onload = function () {
  let wordsContainer = document.getElementById("words-container");
  wordsContainer.style.display = "none";
};

function addWord() {
  let newWordInput = document.getElementById("new-word-input");
  let newWord = newWordInput.value.toLowerCase();

  if (newWord.trim() !== "") {
    words.push(newWord);
    localStorage.setItem("hangman_words", JSON.stringify(words));
    showWords();
    newWordInput.value = "";
  } else {
    alert("Please enter a word!");
  }
}

function deleteWord(wordToDelete) {
  let index = words.indexOf(wordToDelete);
  if (index !== -1) {
    words.splice(index, 1);
    localStorage.setItem("hangman_words", JSON.stringify(words));
    showWords();
  }
}

newGame();

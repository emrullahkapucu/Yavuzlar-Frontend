const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const wrongLetters_el = document.getElementById("worng-letters");

const correctLetters = [];
const wrongLetters = [];
const selectWord = getRandomWord();

function getRandomWord() {
  const words = ["javascript", "java", "pyhton", "emre", "mehmet", "emrullah"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  word_el.innerHTML = `
  
    ${selectWord
      .split("")
      .map(
        (letter) => `
    
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </div>
    
    `
      )
      .join("")}
    
  
  `;

  const w = word_el.innerText.replace(/\n/g, "");
  if (w === selectWord) {
    popup.style.display = "flex";
    message_el.innerText = "Tebrikler Kazandınız";
  }
}

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `

${wrongLetters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
${wrongLetters.map((letter) => `<span> ${lettter} </span>`)}

  `;
}

window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        //bu harfi zaten eklediniz.
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      }
    }
  }
});
displayWord();

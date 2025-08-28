const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript makes web pages interactive and dynamic.",
  "Practice typing every day to improve your speed.",
  "Artificial intelligence is transforming the future.",
  "Success comes from consistency and hard work."
];

const quoteEl = document.getElementById("quote");
const inputArea = document.getElementById("inputArea");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

let currentQuote = "";
let timer = 30;
let timerInterval;
let startTime;

function startTest() {
  // Pick random quote
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerHTML = currentQuote.split("").map(char => `<span>${char}</span>`).join("");

  // Reset
  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();
  resultEl.textContent = "";
  startBtn.disabled = true;
  restartBtn.disabled = false;
  timer = 30;
  timerEl.textContent = `⏱ Time Left: ${timer}s`;

  // Start timer
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  startTime = new Date().getTime();
}

function updateTimer() {
  if (timer > 0) {
    timer--;
    timerEl.textContent = `⏱ Time Left: ${timer}s`;
  } else {
    clearInterval(timerInterval);
    endTest();
  }
}

function endTest() {
  inputArea.disabled = true;
  clearInterval(timerInterval);

  const endTime = new Date().getTime();
  const totalTime = (endTime - startTime) / 1000;

  const typedText = inputArea.value.trim();
  const wordCount = typedText.split(" ").filter(word => word !== "").length;
  const speed = Math.round((wordCount / totalTime) * 60);

  let correctChars = 0;
  const quoteChars = quoteEl.querySelectorAll("span");
  const typedChars = typedText.split("");

  quoteChars.forEach((char, i) => {
    if (typedChars[i] === char.innerText) correctChars++;
  });

  const accuracy = Math.round((correctChars / currentQuote.length) * 100);

  resultEl.textContent = `⏱ Speed: ${speed} WPM | 🎯 Accuracy: ${accuracy}%`;
}

inputArea.addEventListener("input", () => {
  const quoteChars = quoteEl.querySelectorAll("span");
  const typedChars = inputArea.value.split("");

  quoteChars.forEach((char, index) => {
    if (!typedChars[index]) {
      char.classList.remove("correct", "incorrect");
    } else if (typedChars[index] === char.innerText) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
    }
  });
});

startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", startTest);


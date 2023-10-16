"use strict;";

const domDiff = document.getElementById("domDiff");
const domStart = document.getElementById("domStartGame");
const domGrid = document.getElementById("domGrid");
const domScore = document.getElementById("domScore");
const domPreventClick = document.getElementById("domPreventClick");
const domNotification = document.getElementById("domNotification");

const bombsNumber = 16;
let isGameOver = true;

domStart.addEventListener("click", startGame);

const levels = [10, 9, 7];

function startGame() {
  if (isGameOver) {
    resetGame();

    domGrid.classList.add("py-10", "px-5");

    let diff = parseInt(domDiff.value);

    if (!levels.includes(diff)) {
      alert("error");
      return;
    }

    domGrid.classList.add(`grid-cols-${diff}`, `grid-rows-${diff}`);

    const cellsAmount = parseInt(diff * diff);

    let bombs = getBombs(bombsNumber, cellsAmount);

    for (let i = 1; i <= cellsAmount; i++) {
      const tempBox = document.createElement("div");
      tempBox.classList.add("box");
      tempBox.textContent = [i];
      domGrid.appendChild(tempBox);
    }

    console.log("bombs list :)", bombs);

    domGrid.addEventListener("click", (event) => {
      if (isGameOver) {
        const tempCell = event.target;

        if (!tempCell.classList.contains("box")) {
          return;
        } else if (bombs.includes(parseInt(tempCell.textContent))) {
          isGameOver = false;
          const tempImg = document.createElement("img");
          tempImg.src = "./img/bomb.svg";
          tempImg.classList.add("box-img");
          tempCell.style.backgroundColor = "#071824";
          tempCell.appendChild(tempImg);
          gameOver(bombs, cellsAmount);
          bombs = [];
          setTimeout(() => {
            isGameOver = true;
          }, 500);
        }
        if (tempCell.innerHTML.includes("box-img")) {
          return;
        } else {
          const tempImg = document.createElement("img");
          tempImg.src = "./img/diamond.svg";
          tempImg.classList.add("box-img");
          tempCell.style.backgroundColor = "#071824";
          tempCell.appendChild(tempImg);
          domScore.textContent = parseInt(domScore.textContent) + 1;
        }
      }
    });
  }
}

function getBombs(bombsAmount, cellsAmount) {
  const bombs = [];
  while (bombs.length < bombsAmount) {
    const tempNumb = Math.floor(Math.random() * cellsAmount) + 1;
    if (!bombs.includes(tempNumb)) {
      bombs.push(tempNumb);
    }
  }
  return bombs;
}

function resetGame() {
  domGrid.classList.remove("grid-cols-9", "grid-rows-9", "grid-cols-7", "grid-rows-7", "grid-cols-10", "grid-rows-10");
  domGrid.innerHTML = "";
}

function gameOver(bombs, cellsAmount) {
  domPreventClick.classList.remove("hidden");
  const boxesAll = document.querySelectorAll(".box");

  for (let i = 0; i < cellsAmount; i++) {
    if (bombs.includes(parseInt(boxesAll[i].textContent))) {
      const tempBox = boxesAll[i];
      const tempImg = document.createElement("img");
      tempImg.src = "./img/bomb.svg";
      tempImg.classList.add("box-img");
      tempBox.style.backgroundColor = "#071824";
      tempBox.appendChild(tempImg);
      tempBox.classList.add("bg-red-500");
    }
  }

  domNotification.classList.remove("opacity-0");

  domStart.disabled = true;

  setTimeout(() => {
    resetGame();
    domStart.disabled = false;
    domGrid.classList.remove("py-10", "px-5");
    domPreventClick.classList.add("hidden");
    domScore.textContent = 0;
    domNotification.classList.add("opacity-0");
  }, 3500);
}

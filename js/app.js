const listOfCards = document.querySelectorAll('.card');
const cards = document.querySelector('.deck');
const restart = document.querySelector('.fa-repeat');
const moves = document.querySelector('.moves');
const minutesLabel = document.querySelector('.minutes');
const secondsLabel = document.querySelector('.seconds');
const starClass = document.getElementsByClassName('fa-star');
const emptyStar = document.getElementsByClassName('fa-star-o');
const modal = document.querySelector('.modal');
const restartButton = document.querySelector('#myBtn');


let checkCardsList = [];
let openCardsList = [];
let countMove = 0;
let totalSeconds = 0;
let timer;


// Display the cards on the page
function startGame() {
  let stringCards = Array.prototype.slice.call(listOfCards);
  shuffle(stringCards);
  let docFrag = document.createDocumentFragment();
  for (let i = 0; i < stringCards.length; i++) {
    stringCards[i].classList.remove('match', 'show', 'open');
    docFrag.appendChild(stringCards[i]);
  }
  cards.appendChild(docFrag);
  clearInterval(timer);
  secondsLabel.innerText = '00';
  minutesLabel.innerText = '00';
  moves.innerText = '0';
  resetStar();
  modal.classList.remove('show');
}

//reset the stars
function resetStar() {
  if (emptyStar.length > 0) {
    for (let i = (emptyStar.length - 1); i >= 0; i--) {
      emptyStar[i].classList.add('fa-star');
      emptyStar[i].classList.remove('fa-star-o');
    }
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// display the card's symbol
function openCard(event) {
  if (event.target.nodeName.toLowerCase() === 'li') {
    event.target.classList.add('open', 'show');
    let children = event.target.firstElementChild;
    addToCheckList(children);
  }
}

//add the card to a temporary *list* of 'open' cards
function addToCheckList(children) {
  checkCardsList.push(children);
  checkCards(children);
}

//check cards and add to final list of 'open' cards if match
function checkCards(children) {
  if (checkCardsList.length === 2) {
    let firstCard = checkCardsList[0].className;
    let secondCard = checkCardsList[1].className;
    if (firstCard === secondCard) {
      lockCards();
      checkCardsList.splice(0, 2);
      showScore();
    } else {
      changeColor();
      showScore();
    }
  }
}

/* move cards on the final list in they match
 * lock them in the open position
 */
function lockCards() {
  for (let i = 0; i < checkCardsList.length; i++) {
    let parent = checkCardsList[i].parentElement;
    parent.classList.remove('open');
    parent.classList.add('match');
    openCardsList.push(parent);
    if (openCardsList.length == 16) {
      clearInterval(timer);
      delayShowModal();
    }
  }
}

//change the class to the cards that don't match
function changeColor() {
  for (let i = 0; i < checkCardsList.length; i++) {
    let parent = checkCardsList[i].parentElement;
    parent.classList.remove('open');
    parent.classList.add('no-match');
    delayHide();
  }
}

function delayHide() {
  setTimeout(hideCards, 500);
}

//hide the unmatched cards and remove from temporary list
function hideCards() {
  for (let i = 0; i < checkCardsList.length; i++) {
    let parent = checkCardsList[i].parentElement;
    parent.classList.remove('show', 'no-match');
  }
  checkCardsList.splice(0, 2);
}

//count moves
function showScore() {
  countMove += 1;
  moves.innerText = countMove;
  if (countMove === 1) {
    timer = setInterval(setTime, 1000);
  }
  if (countMove === 20 || countMove === 30) {
    let changeStarClass = starClass[(starClass.length - 1)].classList;
    changeStarClass.add('fa-star-o');
    changeStarClass.remove('fa-star');
  }
}

//timer
function setTime() {
  totalSeconds++;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}

function delayShowModal() {
  setTimeout(showModal, 700);
}

//display the modal and show score
function showModal() {
  modal.classList.add('show');
  let finalMoves = document.querySelector('.final-moves');
  let finalStars = document.querySelector('.final-stars');
  finalMoves.textContent = moves.textContent;
  finalStars.textContent = starClass.length;
}

cards.addEventListener('click', openCard);
restart.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

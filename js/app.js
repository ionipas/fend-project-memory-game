const listOfCards = document.querySelectorAll('.card');
const cards = document.querySelector('.deck');

let checkCardsList = [];
let openCardsList = [];


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
    } else {
      changeColor();
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

cards.addEventListener('click', openCard);

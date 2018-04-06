const listOfCards = document.querySelectorAll('.card');
const cards = document.querySelector('.deck');

let checkCardsList = [];
let openCardsList = [];

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

cards.addEventListener('click', openCard);

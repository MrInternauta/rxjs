import { fromEvent, Subject } from "rxjs";
import getRandomWord from "./wordList";


const letterRows = Array.from(document.getElementsByClassName('letter-row') || [])
const messageText = document.getElementById('message-text');

const onKeyDown$ = fromEvent(document, 'keydown');
let letterIndex = 0;
let letterRowIndex = 0;
let letterUserAnswer = [];
let correctAnswer = getRandomWord();
console.log(correctAnswer);
const userScore$ = new Subject();

const insertLetter = {
  next: (value) => {
    const pressedKey = value?.key;
    if (letterRowIndex > 5) {
      return
    }
    if (pressedKey.length == 1 && pressedKey.match(/[a-z]/i) && letterIndex <= 4) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey.toUpperCase();
      letterBox.classList.add('filled-letter');
      letterIndex++;
      letterUserAnswer.push(letterBox.textContent);
      console.log(letterUserAnswer);
    }
  },
}

const checkWord = {
  next: (value) => {
    const pressedKey = value?.key;
    if (pressedKey == 'Enter') {
      const rightWordArr = Array.from(correctAnswer);

      if (letterUserAnswer.length < 5) {
        const missingLetters = 5 - letterUserAnswer.length;
        messageText.textContent = `There are ${missingLetters} missing letters!`;
        return;
      }
      messageText.textContent = '';
      for (let index = 0; index < 5; index++) {
        let letterColor = '';
        let letterBox = Array.from(letterRows)[letterRowIndex].children[index];

        let letterPosition = rightWordArr.indexOf(letterUserAnswer[index]);

        if (letterPosition === -1) {
          letterColor = 'letter-grey';
        } else if (rightWordArr[index] === letterUserAnswer[index]) {
          letterColor = 'letter-green';
        } else {
          letterColor = 'letter-yellow';
        }
        letterBox.classList.add(letterColor);
      }


      // if (correctAnswer == letterUserAnswer.join('')) {
      //   userScore$.next('User win')
      // } else {
      //   userScore$.next('User lose')
      // }

      letterRowIndex++;
      letterIndex = 0;
      letterUserAnswer = [];
      return
    }

  }
}

const deleteLetter = {
  next: (value) => {
    const pressedKey = value?.key;

    if (pressedKey == 'Backspace' && letterIndex !== 0) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex - 1];
      letterBox.textContent = null;
      letterBox.classList.remove('filled-letter');
      letterIndex--;
      letterUserAnswer.pop();
    }
  }
}

onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);
onKeyDown$.subscribe(deleteLetter);

userScore$.subscribe({
  next: (value) => {
// let letterRowsWinned = letterRows[letterRowIndex];
// console.log(letterRowsWinned);
// for (let index = 0; index < 5; index++) {
//   letterRowsWinned.children[index].classList.add(value === 'User win' ? 'letter-green' : 'letter-yellow')
// }
// correctAnswer = getRandomWord();
// console.log(correctAnswer);
  }
})
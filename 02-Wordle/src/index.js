import { fromEvent } from "rxjs";
const letterRows = Array.from(document.getElementsByClassName('letter-row') || [])
const onKeyDown$ = fromEvent(document, 'keydown');
let letterIndex = 0;
let letterRowIndex = 0;

const insertLetter$ = {
  next: (value) => {
    const pressedKey = value.key;
    if (letterRowIndex > 5) {
      return
    }
    if (pressedKey.length == 1 && pressedKey.match(/[a-z]/i) && letterIndex <= 4) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey.toUpperCase();
      letterBox.classList.add('filled-letter');
      letterIndex++;
    }

    if (pressedKey == 'Backspace' && letterRows[letterRowIndex].children[letterIndex - 1]) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex - 1];
      letterBox.textContent = null;
      letterBox.classList.remove('filled-letter');
      letterIndex--;
    }

    if (pressedKey == 'Enter' && letterIndex > 4) {
      letterRowIndex++;
      letterIndex = 0;
    }
  },
  complete: () => {
    console.info('Finished');
  },
  error: (error) => {
    console.error(error)
  }
}
onKeyDown$.subscribe(insertLetter$);
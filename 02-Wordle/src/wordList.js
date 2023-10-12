import WORD_LIST from './wordList.json';

export default function () {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
}
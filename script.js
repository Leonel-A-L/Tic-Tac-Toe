const restartBtn = document.getElementById('restartBtn')
const playerText = document.getElementById('playerText')
const boxes = Array.from(document.getElementsByClassName('box')) //get the element in an Array

const O_choice = 'O'
const X_choice = 'X'
let currentPlayer = X_choice  // cant be const it wount let change choices
const spaces = Array(9).fill(null)


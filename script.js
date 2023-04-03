const restartBtn = document.getElementById('restartBtn')
const playerText = document.getElementById('playerText')
const boxes = Array.from(document.getElementsByClassName('box')) //get the element in an Array

const O_choice = 'O'
const X_choice = 'X'
let currentPlayer = X_choice  // cant be const it wount let change choices
const spaces = Array(9).fill(null)


//winning conditions 
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],   
]

function playerHasWon () {
    for(const condition of winningConditions){
        let [a,b,c] = condition  // a,b,c are the id's in the colum array

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){  // checks if the wining conditions are the same (same choices)
            return [a,b,c]
        }        
    }
    return false
}
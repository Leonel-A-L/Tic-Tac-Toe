const restartBtn = document.getElementById('restartBtn')
const playerText = document.getElementById('playerText')
const boxes = Array.from(document.getElementsByClassName('box')) //get the element in an Array
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-indicator')

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

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked,))    //game starts once its been clicked
    
}

function boxClicked(e) {
    const id = e.target.id //notifies once its been clicked with id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){    //checks if player has not won            
            if(currentPlayer == X_choice){   //checks if once the player has won and if the choice was X makes this function) 
                playerText.innerHTML = `${currentPlayer} has won!`     
                let winning_blocks = playerHasWon()                
                winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            return
            }
            if(currentPlayer == O_choice){  //checks if once the player has won and if the choice was O makes this function) 
                playerText.innerHTML = `${currentPlayer} has won!`  
                let winning_blocks = playerHasWon()    
                winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)               
            return
            }
        }
        
        currentPlayer = currentPlayer == X_choice ? O_choice : X_choice  //changes null to text of X or O choice 
        let player = currentPlayer
        playerText.innerHTML = `player ${player} turn`             
    }         
    if(count_plays === 9){   
        playerText.innerHTML = 'Draw Game'
        boxes.forEach(box => box.style.color = drawIndicator) //if no condtion is met and all spaces have been filled is a draw
        drawText.innerHTML = `Draw's: ${drawScore}`
    }
}


function playerHasWon () {
    for(const condition of winningConditions){
        let [a,b,c] = condition  // a,b,c are the id's in the colum array

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){  // checks if the wining conditions are the same (same choices)
            return [a,b,c]
        }        
    }
    return false
}

restartBtn.addEventListener('click',restart)

function restart() {  //restarts game by making everything blank
    spaces.fill(null)
    
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = '#8B008B'
    })
    playerText.innerHTML = `player x turn`

    currentPlayer = X_choice
}
startGame()
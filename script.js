const restartBtn = document.getElementById('restartBtn')
const playerText = document.getElementById('playerText')
const boxes = Array.from(document.getElementsByClassName('box')) //get the element in an Array
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-indicator')
let X_ScoreText = document.getElementById('X_playerScore')
let O_ScoreText = document.getElementById('O_playerScore')
let drawText = document.getElementById('drawScore')

let scoreX = 0
let scoreO = 0
let drawScore = 0

const O_choice = 'O'
const X_choice = 'X'
let currentPlayer = X_choice  // cant be const it wount let change choices
const spaces = Array(9).fill(null)
let count_plays = 0

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

    if(!spaces[id] && count_plays < 9){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){    //checks if player has not won            
            if(currentPlayer == X_choice){   //checks if once the player has won and if the choice was X makes this function) 
                playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            scoreX++            
            X_ScoreText.innerHTML = `player x score: ${scoreX}`           
            wonPlay() 

            return
            }
            if(currentPlayer == O_choice){  //checks if once the player has won and if the choice was O makes this function) 
                playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            scoreO++            
            O_ScoreText.innerHTML = `player O score: ${scoreO}`
            wonPlay()
            return
            }

        }
        count_plays++
        currentPlayer = currentPlayer == X_choice ? O_choice : X_choice  //changes null to text of X or O choice 
        let player = currentPlayer
        playerText.innerHTML = `player ${player} turn`             
    }
    if(count_plays === 9){   
        playerText.innerHTML = 'Draw Game'
        boxes.forEach(box => box.style.color = drawIndicator) //if no condtion is met and all spaces have been filled is a draw
        drawScore++            
        drawText.innerHTML = `Draw's: ${drawScore}`       
        drawPlay()
    }    
    function play() {     //gives audio when pressing the gameBoard
        let audio = document.getElementById("audio");
        audio.play();
        if (audio.currentTime >= .05) {
              audio.currentTime = .00001;
              
              }
      }play()
}
function drawPlay() {     //gives audio when pressing the gameBoard
    let drawAudio = document.getElementById("drawAudio");
        drawAudio.play();                     
}
function wonPlay() {     //gives audio when pressing the gameBoard
    let wonAudio = document.getElementById("wonAudio");
        wonAudio.play();               
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
    count_plays = 0
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = '#8B008B'
    })
    playerText.innerHTML = `player x turn`

    currentPlayer = X_choice
}
startGame()



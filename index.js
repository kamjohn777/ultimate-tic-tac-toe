
/* Current Player Variables */
let currentPlayer = 'cross';

/* Board/Cells Variables */
const mainGameboard = document.querySelector('#main-gameboard');
let boardCells = [ "", "", "", "", "", "", "", "", ""];
let activeSubBoards = [false, false, false, false, false, false, false, false, false];
let lastMoveSubCell = null;

/* Winning combos Variables */
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

 let infoDisplay = document.querySelector('#info')


/* Creating Main Board Cells */
function creatingGameBoard() {
    boardCells.forEach((_cell, index) => {
        const individualCell = document.createElement('div');
        individualCell.classList.add('cells');
        individualCell.id = 'indiCell' + index;
        individualCell.isActive = true;
        mainGameboard.append(individualCell);

         // Add a click event listener to each game board cell
         individualCell.addEventListener('click', () => {
            if (activeSubBoards) {
                handleGameBoardCellClick(index);
            }
        });
    });
}

creatingGameBoard();

/* Creating SubBoard Cells */
function subBoardsPerCell() {
    const cells = document.querySelectorAll('.cells'); // Select all cells
    cells.forEach((individualCell, sbBoard) => {
        const subBoard = document.createElement('div');
        subBoard.classList.add('sub');
        subBoard.id = 'sub' + sbBoard;
      
     for (let subCellIndex = 0; subCellIndex < 9; subCellIndex++) {
        const subCellDiv = document.createElement('div');
        subCellDiv.classList.add('sub-cell');
        subCellDiv.id= 'sub-cell' + subCellIndex + '-' + sbBoard;
      
        // Add a click event listener to each sub-cell
        subCellDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            handleSubCellClick(sbBoard, subCellIndex);
        });

        subBoard.append(subCellDiv);
    }

    individualCell.append(subBoard);
  });
}

subBoardsPerCell();

/* Checks winning sub board combos */
function checkSubBoardWinner(subBoardIndex) {
    const subBoard = document.getElementById('sub' + subBoardIndex);
    const cells = subBoard.querySelectorAll('.sub-cell');
    console.log(subBoard)
    console.log(cells);
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    winningCombos.forEach(array => {
       let circleWins = array.every(cell => cells[cell].firstChild?.classList.contains('circle'));

       if (circleWins) {
            infoDisplay.textContent = 'Circle Wins!';
            // subBoard.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
            cells.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
            return;
       }
    })
    
    
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].querySelector('.circle') && cells[b].querySelector('.circle') && cells[c].querySelector('.circle')) {
            return 'circle';
        } else if (cells[a].querySelector('.cross') && cells[b].querySelector('.cross') && cells[c].querySelector('.cross')) {
            return 'cross';
        }
    }
    
    return null;  // No winner yet
}

// 


function handleSubCellClick(sbBoard, subCellIndex) {
    const subCell = document.getElementById('sub-cell' + subCellIndex + '-' + sbBoard);
    lastMoveSubCell = subCellIndex;

    
    // Check if there's a winner after the move
    const winner = checkSubBoardWinner(sbBoard);
    if (winner) {
        const subBoardDiv = document.getElementById('sub' + sbBoard);
        subBoardDiv.classList.add(winner + '-won'); // Adds either "circle-won" or "cross-won" to the sub-board
        
        // Optionally: Display a message if needed
        const msgDisplay = document.getElementById('turn-msg');
        msgDisplay.innerHTML = `Player ${winner} wins the sub-board ${sbBoard}`;
    }

    if (subCell.querySelector('.circle') || subCell.querySelector('.cross')) {
        // The sub-cell is already occupied, so return early.
        return;
    }

    const moveDiv = document.createElement('div');
    moveDiv.classList.add(currentPlayer);

    subCell.appendChild(moveDiv);

        // Switch the current player
    if (currentPlayer === 'circle') {
        currentPlayer = 'cross';
    } else {
        currentPlayer = 'circle';
    }

    const subBoardDiv = document.getElementById('sub' + sbBoard);
    subBoardDiv.classList.toggle('circle-sub-board');
    subBoardDiv.classList.toggle('cross-sub-board');

    currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle';

    const msgDisplay = document.getElementById('turn-msg');
    msgDisplay.innerHTML = `It's ${currentPlayer} turn`;


     const subBoard = document.getElementById('sub' + sbBoard);
     subBoard.classList.remove(currentPlayer === 'circle' ? 'circle-sub-board' : 'cross-sub-board');
     subBoard.classList.add(currentPlayer === 'circle' ? 'cross-sub-board' : 'circle-sub-board');

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

    // Deactivate all sub-boards
    activeSubBoards = activeSubBoards.map(() => false);

    // Activate the sub-board corresponding to the sub-cell clicked
    activeSubBoards[subCellIndex] = true;

    updateSubBoardStyles();
}


function updateSubBoardStyles() {
    const allSubBoards = document.querySelectorAll('.sub');
    allSubBoards.forEach((subBoard, index) => {
        if (activeSubBoards[index]) {
            subBoard.classList.add('active');
        } else {
            subBoard.classList.remove('active');
        }
    });
}

updateSubBoardStyles();

function updateActiveSubBoard() {
    // Reset all sub-boards to inactive first
    activeSubBoards = activeSubBoards.map(() => false);
    // Activate the sub-board based on the last move
    if (lastMoveSubCell !== null) {
        activeSubBoards[lastMoveSubCell] = true;
    }
}

updateActiveSubBoard();

function isSubBoardFull(subBoardIndex) {
    const subBoard = document.querySelectorAll('.sub')[subBoardIndex];
    const cells = subBoard.querySelectorAll('.sub-cell');
    for (let cell of cells) {
        if (!cell.classList.contains('cross') && !cell.classList.contains('circle')) {
            return false;
        }
    }
    return true;
}

function handleFullSubBoard() {
    if (lastMoveSubCell !== null && isSubBoardFull(lastMoveSubCell)) {
        activeSubBoards = activeSubBoards.map(() => true);
    }
}


// try to ue conditions to toggle between hovers in the css when its circle hover a certain color and vise versa


//  do like if (subaboardCells === winning combos) {subboard.style.display = ".winningBoardDisplay"}
// so in the line above we can try and use the style to set up the display if a player wins a board and update the css style later so these are all just fill ins rigth now 

const mainGameboard = document.querySelector('#main-gameboard');
let currentPlayer = 'cross';
let boardCells = [
    "", "", "", "", "", "", "", "", ""
]
let activeSubBoards = [false, false, false, false, false, false, false, false, false];
let lastMoveSubCell = null;

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

function handleSubCellClick(sbBoard, subCellIndex) {
    const subCell = document.getElementById('sub-cell' + subCellIndex + '-' + sbBoard);
    lastMoveSubCell = subCellIndex;

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
    const cells = subBoard.querySelectorAll('.cell');
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
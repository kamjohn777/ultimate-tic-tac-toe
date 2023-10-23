
const mainGameboard = document.querySelector('#main-gameboard');
let currentPlayer = null;
let boardCells = [
    "", "", "", "", "", "", "", "", ""
]

function creatingGameBoard() {
    boardCells.forEach((_cell, index) => {
        const individualCell = document.createElement('div');
        individualCell.classList.add('cells');
        individualCell.id = 'indiCell' + index;
        mainGameboard.append(individualCell);
    });
}

creatingGameBoard();


function subBoardsPerCell() {
    const cells = document.querySelectorAll('.cells'); // Select all cells
    cells.forEach((individualCell, sbBoard) => {
        const subBoard = document.createElement('div');
        subBoard.classList.add('sub');
        subBoard.id = 'sub' + sbBoard;
      
     for (let subCell = 0; subCell < 9; subCell++) {
        const subCell = document.createElement('div');
        subCell.classList.add('sub-cell');
        subCell.id = 'sub-cell' + subCell;
      
        // Add a click event listener to each sub-cell
        subCell.addEventListener('click', () => {
            handleSubCellClick(sbBoard, subCell);
        });

        subBoard.append(subCell);
    }

    individualCell.append(subBoard);
  });
}

subBoardsPerCell();

function handleSubCellClick(sbBoard, subCell) {
    const subCells = document.getElementById('sub-cell' + subCell + sbBoard);

    if (subCell.querySelector('.circle') || subCell.querySelector('.cross')) {
        // The sub-cell is already occupied, so return early.
        return;
    }

    const circleDiv = document.createElement('div');
    circleDiv.classList.add('circle');

    const crossDiv = document.createElement('div');
    crossDiv.classList.add('cross');

      // Add the circle or cross div element to the sub-cell based on the current player
      if (currentPlayer === 'circle') {
        subCell.appendChild(circleDiv); 
    } else {
        subCell.appendChild(crossDiv); 
    }

       // THIS CHANGES THE BOARDS COLORS WE'LL FIX IT A LITTLE MORE LATER
     // Updates the background color of the sub-boards based on the current player
     const subBoard = document.getElementById('sub' + sbBoard);
     subBoard.classList.remove(currentPlayer === 'circle' ? 'circle-sub-board' : 'cross-sub-board');
     subBoard.classList.add(currentPlayer === 'circle' ? 'cross-sub-board' : 'circle-sub-board');

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';


    const msgDisplay = document.getElementById('turn-msg');
    msgDisplay.innerHTML = `It's ${currentPlayer} turn`;
}

// try to ue conditions to toggle between hovers in the css when its circle hover a certain color and vise versa
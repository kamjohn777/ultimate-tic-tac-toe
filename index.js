
const mainGameboard = document.querySelector('#main-gameboard');
// let currentPlayer = "O";
let currentPlayer = null;
let boardCells = [
    "", "", "", "", "", "", "", "", ""
]

function creatingGameBoard() {
    boardCells.forEach((_cell, index) => {
        const individualCell = document.createElement('div');
        individualCell.classList.add('cells');
        individualCell.id = 'indiCell' + index;
        // individualCell.addEventListener('click',)
        mainGameboard.append(individualCell);
    });
}

creatingGameBoard();

// function subBoardsPerCell() {
//     individualCell.forEach((_cell, sbBoard) => {
//         const subBoard = document.createElement('div')
//         subBoard.classList.add('sub');
//         subBoard.id = 'sub' + sbBoard;
//         individualCell.append(subBoard);
//     })
// }

function subBoardsPerCell() {
    const cells = document.querySelectorAll('.cells'); // Select all cells
    cells.forEach((individualCell, sbBoard) => {
        const subBoard = document.createElement('div');
        subBoard.classList.add('sub');
        subBoard.id = 'sub' + sbBoard;
        // individualCell.append(subBoard);
     // Create sub-cells within the sub-board
     for (let subCell = 0; subCell < 9; subCell++) {
        const subCell = document.createElement('div');
        subCell.classList.add('sub-cell');
        subCell.id = 'sub-cell' + subCell;
        // subBoard.append(subCell);
        // Add a click event listener to each sub-cell
        subCell.addEventListener('click', () => {
            handleSubCellClick(sbBoard, subCell);
        });

        subBoard.append(subCell);
    }

    individualCell.append(subBoard);
});

    // const subCells = document.querySelectorAll('.sub');
    // subCells.forEach((subBoard, sbCell) => {
    //     const subcells = document.createElement('div');
    //     subCells.classList.add('sub-board-cells');
    //     subCells.id = 'sub-board-cells' + sbCell;
    //     subBoard.append(subCells)
    // });

    
}

subBoardsPerCell();

function handleSubCellClick(sbBoard, subCell) {
    const subCells = document.getElementById('sub-cell' + subCell + sbBoard);

    // if(subCell.textContent !== '') {
    //     // we are just using return so if it is already clicked it wont do anything
    //     return;
    // }

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
        subCell.appendChild(crossDiv); // Display the cross for 'X'
    } else {
        subCell.appendChild(circleDiv); // Display the circle for 'O'
    }

       // THIS CHANGES THE BOARDS COLORS WE'LL FIX IT A LITTLE MORE LATER
     // Update the background color of the sub-boards based on the current player
     const subBoard = document.getElementById('sub' + sbBoard);
     subBoard.classList.remove(currentPlayer === 'circle' ? 'cross-sub-board' : 'circle-sub-board');
     subBoard.classList.add(currentPlayer === 'circle' ? 'circle-sub-board' : 'cross-sub-board');

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';


    const msgDisplay = document.getElementById('turn-msg');
    // document.querySelector(msgDisplay).innerHTML = `It's ${currentPlayer} turn`;
    msgDisplay.innerHTML = `It's ${currentPlayer} turn`;
}

// const subCells = document.getElementById("sub-cell");

// subCells.addEventListener("click", function() {
//     subBoardsPerCell();

// })

// try to ue conditions to toggle between hovers in the css when its circle hover a certain color and vise versa
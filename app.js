
const puzzleboard = document.querySelector('#puzzle')
const solvebutton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
let board = [];
const squares = 81;

for (let i = 0; i < squares; i++) {
    const inputelement = document.createElement('input');
    inputelement.setAttribute('type', 'number');
    inputelement.setAttribute('min', '1');
    inputelement.setAttribute('max', '9');

    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)

    ) {
        inputelement.classList.add('odd-section')
    }





    puzzleboard.appendChild(inputelement);// it appends only a single child
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value) {
            board.push(input.value);
        } else {
            board.push('.')
        }
    })
    console.log(board);
};

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input');
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i];
        })

        solutionDisplay.innerHTML = 'This is the Answer.'
    }
    else {
        solutionDisplay.innerHTML = 'This is not Solvable.'
    }
}

const solve = () => {
    joinValues();
    const loaddata = {numbers : board.join('')}
    console.log('data', loaddata)
    fetch('http://localhost:8000/solve', {
        method :'POST', 
        headers:{
            'Content-Type' : 'application/json', 
            'Accept' : 'application/json',
        }, 
        body:JSON.stringify(loaddata),
    }) . then(response => response.json())
        .then(loaddata => {
            console.log(loaddata);
            populateValues(loaddata.solvable, loaddata.solution);
            board = [];
        })
        .catch((error) =>{
            console.error('Error:', error)
        })
}

solvebutton.addEventListener('click', solve);
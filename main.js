const game = document.getElementById('game');
const rows = [...document.getElementsByClassName("row")];
const msg = document.querySelector('#msg');
let table = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let player = 1; // 1 = x, -1 = o
let timeoutTriggered = false;
let timeout = 0;

const loadTable = () => {
    for (rowId in table) {
        let row = '';
        for (cellId in table[rowId]) {
            row += loadButton(rowId, cellId);
        }
        rows[rowId].innerHTML = row;
    }
    [...document.getElementsByClassName('cell')].forEach((_) => _.addEventListener('click', () => click(_)))
};

const loadButton = (rowId, cellId) => {
    return `<button class="cell" id="${rowId}-${cellId}">${table[rowId][cellId]}</button>`;
}

const click = (button) => {
    if (timeoutTriggered) return;
    const [rowId, cellId] = button.id.split('-');
    if (table[rowId][cellId] != '') return alert("Invalid cell. Please, try another one!");
    table[rowId][cellId] = player < 0 ? "O" : "X";
    player = -player;
    loadTable();
    const winner = checkWhoWon();
    console.log(winner)
    if (winner?.length == 1) message(`Player ${winner} won!`);
    if (winner?.length > 1) message("Draw!");
};

const checkWhoWon = () => {
    const wonCases = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
        [[0, 0], [1, 1], [2, 2]]
    ];
    let winner;
    for (wonCase of wonCases) {
        let ig = table[wonCase[0][0]][wonCase[0][1]];
        if (ig == '') continue;
        if (wonCase.every(_ => table[_[0]][_[1]] == ig)) {
            winner = ig;
        }
    }

    console.log({ winner })
    if (winner) return winner ? winner : '';
    if (table.every(_ => _.join("").length === 3)) return "XO";
}
const message = (text) => {
    msg.innerHTML = text;
    timeoutTriggered = true;
    timeout = window.setTimeout(restart, 1500);
}

const restart = () => {
    console.log('restarting')
    table = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    player = 1; // 1 = x, -1 = o
    loadTable();
    msg.innerHTML = "Welcome!";
    timeoutTriggered = false;
    window.clearTimeout(timeout);
}
(() => {
    loadTable();
    document.querySelector('#restart').addEventListener('click', restart);
})();
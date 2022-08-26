const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let win = false;
function putX(line, column) {

    if (win || board[line][column]) {
        return;
    }

    const button = window.document.getElementsByTagName('button')[convert(line, column)];
    button.innerText = 'X';
    board[line][column] = 1;
    if (won().x === 3) {
        const p = window.document.getElementById("result");
        p.innerText = "Você ganhou";
        win = true;
    } else {
        putO();
    }


}

function putO() {

    const evaluation = [[null, null, null], [null, null, null], [null, null, null]]

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {

            if (board[i][j]) continue;

            let xInLine = 0;
            let oInLine = 0;
            for (let c = 0; c < board[0].length; c++) {
                if (board[i][c] === 1) {
                    xInLine++;
                }
                if (board[i][c] === 2) {
                    oInLine++;
                }
            }
            let xInColumn = 0;
            let oInColumn = 0;
            for (let c = 0; c < board[0].length; c++) {
                if (board[c][j] === 1) {
                    xInColumn++;
                }
                if (board[c][j] === 2) {
                    oInColumn++;
                }
            }
            let xInDiagonal = 0;
            let oInDiagonal = 0;
            if ((i === 0 || i === 2) && (j === 0 || j === 2) || (i === 1 && j === 1)) {
                for (let c = 0; c < board[0].length; c++) {
                    if (i === j) {
                        if (board[c][c] === 1) {
                            xInDiagonal++;
                        }
                        if (board[c][c] === 2) {
                            oInDiagonal++;
                        }
                    } else {
                        if (board[c][board.length - c - 1] === 1) {
                            xInDiagonal++;
                        }
                        if (board[c][board.length - c - 1] === 2) {
                            oInDiagonal++;
                        }
                    }
                }
            }
            evaluation[i][j] = {
                xInLine,
                xInColumn,
                xInDiagonal,
                oInLine,
                oInColumn,
                oInDiagonal,
                total: xInLine + xInColumn + xInDiagonal
            }
        }
    }

    let chosen = {
        priority: 0,
        i: Math.floor(Math.random() * (3 - 0) + 0),
        j: Math.floor(Math.random() * (3 - 0) + 0)
    }


    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {


            if (!evaluation[i][j]) {
                continue
            };

            if (evaluation[i][j].oInLine === 2 || evaluation[i][j].oInColumn === 2 || evaluation[i][j].oInDiagonal === 2) {

                chosen = {
                    priority: 3,
                    i, j
                }
                continue;
            }

            if (chosen.priority < 2 && (evaluation[i][j].xInLine === 2 || evaluation[i][j].xInColumn === 2 || evaluation[i][j].xInDiagonal === 2)) {

                chosen = {
                    priority: 2,
                    i, j
                }
                continue;
            }
            if (chosen.priority <= 1) {
                if ((!evaluation[chosen.i][chosen.j] || evaluation[i][j].total > evaluation[chosen.i][chosen.j].total) || (evaluation[i][j].total == evaluation[chosen.i][chosen.j].total && Math.random()<0.5)) {

                    chosen = {
                        priority: 0,
                        i, j
                    }
                    if ((i === 0 || i === 2) && (j === 0 || j === 2)) {

                        chosen.priority = 1;
                    }
                }
            }

        }
    }
    const button = window.document.getElementsByTagName('button')[convert(chosen.i, chosen.j)];

    button.innerText = 'O';
    board[chosen.i][chosen.j] = 2;

    if (won().o === 3) {
        const p = window.document.getElementById("result");
        p.innerText = "O PC ganhou";
        win = true;
    }

}

function convert(i, j) {
    if (i === 0) {
        return 0 + j;
    }
    if (i === 1) {
        return 3 + j
    }
    if (i === 2) {
        return 6 + j
    }
}

function won() {
    let o = 0;
    let x = 0;
    for (let i = 0; i < board.length; i++) {
        x = 0;
        o = 0;
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 1) x++;
            if (board[i][j] === 2) o++;
        }
        if (x === 3) return { x, o };
        if (o === 3) return { x, o };
        x = 0;
        o = 0;
        for (let j = 0; j < board[0].length; j++) {
            if (board[j][i] === 1) x++;
            if (board[j][i] === 2) o++;
        }
        if (x === 3) return { x, o };
        if (o === 3) return { x, o };
    }
    x = 0;
    o = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i][i] === 1) x++;
        if (board[i][i] === 2) o++;
    }
    if (x === 3) return { x, o };
    if (o === 3) return { x, o };

    x = 0;
    o = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i][board.length - 1 - i] === 1) x++;
        if (board[i][board.length - 1 - i] === 2) o++;
    }

    return { x, o }
}
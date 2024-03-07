const width = 600
const height = 600
const rows = 15
const cols = 15

let gridArr = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false))

let verticals = Array(rows)
    .fill(null)
    .map(() => Array(cols - 1).fill(false))

let horizontals = Array(rows - 1)
    .fill(null)
    .map(() => Array(cols).fill(false))

// console.log(gridArr, verticals, horizontals);

const startRow = Math.floor(Math.random() * rows)
const startCol = Math.floor(Math.random() * cols)

const shuffleArray = (arr) => {
    let counter = arr.length

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter)

        counter--;

        const temp = arr[counter]
        arr[counter] = arr[index]
        arr[index] = temp
    }
    return arr
}

const initializeGridCells = (row, col) => {
    // if I have visited the cell at [row, col] then return
    if(gridArr[row][col]){
        return;
    }

    // Mark this cell as being visited in gridArr
    gridArr[row][col] = true

    // assemble randomly ordered list of neighbors
    const neighbors = shuffleArray([
        [row - 1, col, "up"],
        [row, col + 1, "right"],
        [row + 1, col, "down"],
        [row, col - 1, "left"]
    ])

    // For each neighbor:
    for (let neighbor of neighbors) {
        const [nextRow, nextCol, dir] = neighbor

        // see if that neighbor is inside the grid
        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
            continue;
        }

        // if we have visited that neighbor continue to next neighbor
        if (gridArr[nextRow][nextCol]) {
            continue;
        }

        // remove a wall from either horizontals or verticals (false -> true)
        switch(dir){
            case "left":
                verticals[row][col - 1] = true
                break;
            case "right":
                verticals[row][col] = true
                break;
            case "up":
                horizontals[row - 1][col] = true
                break;
            case "down":
                horizontals[row][col] = true
                break;
        }

        initializeGridCells(nextRow, nextCol)
    }
}

initializeGridCells(startRow, startCol)
// console.log(horizontals, verticals);
/**
 * implement algorythm to remove all islands from matrix, where island is a group of '1' (at least one '1'), within witch none is touching the edge
 * for example
 *
 * @example
 * [[1, 1, 0, 0, 0, 1],
 *  [1, 0, 0, 0, 0, 0],
 *  [1, 0, 1, 0, 0, 0],
 *  [1, 1, 0, 0, 1, 0],
 *  [0, 1, 0, 0, 1, 0],
 *  [1, 1, 0, 1, 0, 0]]
 *
 *  =>
 *
 * [[1, 1, 0, 0, 0, 1],
 *  [1, 0, 0, 0, 0, 0],
 *  [1, 0, 0, 0, 0, 0],
 *  [1, 1, 0, 0, 0, 0],
 *  [0, 1, 0, 0, 0, 0],
 *  [1, 1, 0, 1, 0, 0]]
 *
 */

const removeIslands = (array) => {
    // obtain size of matrix, to determine which '1' are touching edges
    const SIZE_Y = array.length
    const SIZE_X = array[0].length

    const NEIGHBOURS = [
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
    ]

    const isConnectedToEdge = (x, y, traversed) => {
        if (array[y][x] === 0) return false

        if (x === 0 || x === SIZE_X - 1 || y === 0 || y === SIZE_Y - 1) {
            return true
        }
        for (let index = 0; index < NEIGHBOURS.length; index++) {
            const [dx, dy] = NEIGHBOURS[index]
            const newX = x + dx
            const newY = y + dy

            if (
                newX >= 0 &&
                newX < SIZE_X &&
                newY >= 0 &&
                newY < SIZE_Y &&
                !traversed.includes(stringifyIndex(newX, newY))
            )
                return isConnectedToEdge(newX, newY, [...traversed, stringifyIndex(newX, newY)])
        }
    }

    return array.map((row, y) => row.map((value, x) => (isConnectedToEdge(x, y, []) ? 1 : 0)))
}

// helper
function stringifyIndex(x, y) {
    return `${x}-${y}`
}

module.exports = removeIslands

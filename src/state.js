export const state = {
  cells: [],
  keyIndex: 0,
  rowSize: 8,
}

export const getNumCells = () => Math.pow(state.rowSize, 2)

export const randomizeCells = () => {
  state.cells = []
  for (let i = 0; i < getNumCells(); i++) {
    state.cells[i] = Math.random() > 0.5
  }
}

export const randomizeKey = () => {
  state.keyIndex = Math.floor(Math.random() * getNumCells())
}

export const updateKey = i => {
  state.keyIndex = i
}

export const updateRowSize = r => {
  state.rowSize = r
}

export const flipCell = (i) => {
  state.cells[i] = !state.cells[i]
}

// Find secret index of warden's key by doing XOR on all indexes with true cells (heads)
// How this works: https://www.youtube.com/watch?v=b3NxrZOu_CE&t=352s
export const decodeCells = () => state.cells.reduce(
  (prev, curr, i) =>
    state.cells[i] === true
      ? prev ^ i // ✨
      : prev,
  0,
)

export const getSolution = (currDecode, targetDecode) => currDecode ^ targetDecode

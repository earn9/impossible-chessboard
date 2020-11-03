import { createBoard, updateBoard } from './board'
import './browserTweaks'
import './styles/index.scss'

const rowSize = 8
const numCells = Math.pow(rowSize, 2)
const board = document.querySelector('.board')
let cells = []
let keyIndex = 0

const randomizeCells = () => {
  cells = []
  for (let i = 0; i < numCells; i++) {
    cells[i] = Math.random() > 0.5
  }
}

const randomizeKey = () => {
  keyIndex = Math.floor(Math.random() * numCells)
}

const updateKey = i => {
  keyIndex = i
}

const updateCell = (i, value) => {
  cells[i] = value
}

// Find secret index of warden's key by doing XOR on all indexes with true cells (heads)
// How this works: https://www.youtube.com/watch?v=b3NxrZOu_CE&t=352s
const decodeCells = () => cells.reduce(
  (prev, curr, i) =>
    cells[i] === true
      ? prev ^ i
      : prev,
)

const getSolution = (currDecode, targetDecode) => currDecode ^ targetDecode

const update = () => {
  const decodedIndex = decodeCells()

  console.log(decodedIndex)

  updateBoard({
    board,
    cells,
    decodedIndex,
    secretIndex: keyIndex,
    solutionIndex: getSolution(decodedIndex, keyIndex),
  })
}

randomizeKey()
randomizeCells()

createBoard({
  board,
  rowSize,
  cells,
  update,
  updateCell,
  updateKey,
})

update()

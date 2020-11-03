import { fitText } from './fittext'
import './browserTweaks'
import './styles/index.scss'

const board = document.querySelector('.board')

const rowSize = 8
const numCells = Math.pow(rowSize, 2)
const longPressMs = 500

let cells = []
let keyIndex = 0

let longPressTimer
let didJustLongPress = false

// Create chessboard in HTML
const cellWidth = 80 / rowSize
board.style.gridTemplateRows = `repeat(${rowSize}, [row] ${cellWidth}vw)`
board.style.gridTemplateColumns = `repeat(${rowSize}, [col] ${cellWidth}vw)`

for (let i = 0; i < numCells; i++) {
  const cell = document.createElement('div')
  const coin = document.createElement('div')
  cell.classList.add('cell')
  coin.classList.add('coin')

  // Colour the cells like a chessboard
  // This is not as simple as doing a mod 2, that results in stripes
  const rowNum = Math.floor(i / rowSize)
  if (i % 2 !== rowNum % 2) {
    cell.classList.add('dark')
  }

  cell.append(coin)
  board.append(cell)

  cell.addEventListener('mousedown', () => {
    clearTimeout(longPressTimer)
    longPressTimer = setTimeout(() => {
      keyIndex = i
      update()
      didJustLongPress = true
    }, longPressMs)
  })

  cell.addEventListener('mouseup', () => {
    if (!didJustLongPress) {
      clearTimeout(longPressTimer)
      cells[i] = !cells[i]
      update()
    }
    didJustLongPress = false
  })
}

const randomizeCells = () => {
  cells = []
  for (let i = 0; i < numCells; i++) {
    cells[i] = Math.random() > 0.5
  }
}

const randomizeKey = () => {
  keyIndex = Math.floor(Math.random() * numCells)
}

const decodeCells = () => {
  // Find secret index of warden's key by doing XOR on all indexes with true cells (heads)
  let acc = 0

  for (let i = 1; i < numCells; i++) {
    if (cells[i] === true) {
      acc ^= i
    }
  }

  return acc
}

const getSolution = (currDecode, targetDecode) => currDecode ^ targetDecode

const updateBoard = ({ decodedIndex, secretIndex, solutionIndex } = {}) => {
  document.querySelectorAll('.cell').forEach((cell, i) => {
    // Give cells heads/tails label
    const coin = cell.querySelector('.coin')
    coin.classList.toggle('isHead', cells[i] === true)

    // Style cells accordingly
    cell.classList.toggle('hasDecoded', i === decodedIndex)
    cell.classList.toggle('hasKey', i === secretIndex)
    cell.classList.toggle('selected', i === solutionIndex)

    // Hacky way to get fonts (including emojis) to resize for different screen sizes
    fitText(cell, 0.3)
    fitText(coin, 0.2)
  })
}

randomizeKey()
randomizeCells()

const update = () => {
  const decodedIndex = decodeCells()

  updateBoard({
    decodedIndex,
    secretIndex: keyIndex,
    solutionIndex: getSolution(decodedIndex, keyIndex),
  })
}

update()

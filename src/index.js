import './styles/index.scss'

const board = document.querySelector('.board')

const rowSize = 8
const numCells = Math.pow(rowSize, 2)

let cells = []
let keyIndex = 0

// Create chessboard in HTML
const cellWidth = 80 / rowSize
board.style.gridTemplateRows = `repeat(${rowSize}, [row] ${cellWidth}vw)`
board.style.gridTemplateColumns = `repeat(${rowSize}, [col] ${cellWidth}vw)`

for (let i = 0; i < numCells; i++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.addEventListener('click', () => {
    cells[i] = !cells[i]
    update()
  })
  board.append(cell)
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
    cell.textContent = cells[i] === true ? 'H' : 'T'

    // Style cells accordingly
    cell.classList.toggle('hasDecoded', i === decodedIndex)
    cell.classList.toggle('hasKey', i === secretIndex)
    cell.classList.toggle('shouldFlip', i === solutionIndex)
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

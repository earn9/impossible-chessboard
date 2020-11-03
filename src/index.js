import { createBoard, updateBoard } from './board'
import { state, decodeCells, flipCell, updateKey, getSolution, randomizeCells, randomizeKey } from './state'
import './browserTweaks'
import './styles/index.scss'

const board = document.querySelector('.board')

const update = () => {
  const decodedIndex = decodeCells()

  updateBoard({
    board,
    cells: state.cells,
    decodedIndex,
    secretIndex: state.keyIndex,
    solutionIndex: getSolution(decodedIndex, state.keyIndex),
  })
}

randomizeKey()
randomizeCells()

createBoard({
  board,
  rowSize: state.rowSize,
  cells: state.cells,
  update,
  flipCell,
  updateKey,
})

update()

document.querySelector('#randomize').addEventListener('click', () => {
  randomizeKey()
  randomizeCells()
  update()
})

document.querySelector('#auto-solve').addEventListener('click', () => {
  flipCell(getSolution(decodeCells(), state.keyIndex))
  update()
})

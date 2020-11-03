/***

All the GUI stuff

***/

import { fitText } from './fittext'

const longPressMs = 300
let isTouchDevice = false

// Create chessboard in HTML
export const createBoard = ({ board, rowSize, update, updateKey, cells, flipCell }) => {
  let longPressTimer
  let didJustLongPress = false

  const numCells = cells.length
  const cellWidth = 90 / rowSize
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

    const onDown = () => {
      clearTimeout(longPressTimer)
      longPressTimer = setTimeout(() => {
        updateKey(i)
        update()
        didJustLongPress = true
      }, longPressMs)
    }

    const onUp = () => {
      if (!didJustLongPress) {
        clearTimeout(longPressTimer)
        flipCell(i)
        update()
      }
      didJustLongPress = false
    }

    cell.addEventListener('touchstart', () => {
      isTouchDevice = true
      onDown()
    })
    cell.addEventListener('touchend', onUp)

    cell.addEventListener('mousedown', () => {
      if (!isTouchDevice) {
        onDown()
      }
    })
    cell.addEventListener('mouseup', () => {
      if (!isTouchDevice) {
        onUp()
      }
    })
  }
}

export const updateBoard = ({ board, decodedIndex, secretIndex, solutionIndex, cells } = {}) => {
  board.querySelectorAll('.cell').forEach((cell, i) => {
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
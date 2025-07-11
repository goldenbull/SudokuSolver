import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

// 一个单元格的全部信息
export class Cell {
  // for debug
  id: string

  // for debug, 在整个board中的坐标
  x: number
  y: number

  // 选中的数字
  n: number | null = null

  // 备选数字，运行时顺序可能会变化，不保序
  candidates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.id = `[${x} ${y}]`
  }

  setNumber(n: number) {
    if (this.candidates.indexOf(n) != -1) {
      this.n = n
      this.candidates = []
    } else {
      throw new RangeError(`${n} not in candidates`)
    }
  }

  reset() {
    // reset to initial status
    this.n = null
    this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  addCandidate(c: number) {
    if (!Number.isInteger(c) || c < 1 || c > 9) {
      throw new Error(`invalid number [${c}]`)
    }
    if (this.candidates.indexOf(c) != -1) {
      throw new Error(`${c} already exists`)
    }
    this.candidates.push(c)
  }

  removeCandidate(c: number) {
    var idx = this.candidates.indexOf(c)
    if (idx != -1) {
      this.candidates.splice(idx, 1)
    } else {
      throw new RangeError(`${c} not in candidates`)
    }
  }

  // TODO: 状态信息，有当前cell可以算出的，有全局计算出的
}

// 一个完整的截面状态
// 9x9个cell组成一个board
// 其中每3x3个cell、每行、每列组成一个group，用于进行判断
export class Board {
  cells: Cell[][]

  block_groups: Cell[][]
  row_groups: Cell[][]
  col_groups: Cell[][]

  // for debug
  seq: number = 0

  // 初始化
  constructor() {
    // create all cells
    this.cells = new Array(9)
    for (let x = 0; x < 9; x++) {
      this.cells[x] = new Array(9)
      for (let y = 0; y < 9; y++) {
        this.cells[x][y] = new Cell(x + 1, y + 1)
      }
    }

    // init all groups
    this.block_groups = new Array(9)
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const cells = []
        for (let i = 0; i < 9; i++) {
          cells.push(this.cells[x * 3 + Math.floor(i % 3)][y * 3 + Math.floor(i / 3)])
        }
        this.block_groups[x * 3 + y] = cells
      }
    }

    this.row_groups = new Array(9)
    for (let y = 0; y < 9; y++) {
      this.row_groups[y] = new Array(9)
      for (let x = 0; x < 9; x++) {
        this.row_groups[y][x] = this.cells[x][y]
      }
    }

    this.col_groups = this.cells // just the same stucture
  }

  getCellsInBlock(x: number, y: number): Cell[] {
    if (x < 0 || x >= 3 || y < 0 || y >= 3) {
      throw new RangeError(`${x} ${y} out of range`)
    }
    return this.block_groups[x * 3 + y]
  }
}

// Cell和Board只保存数据，游戏逻辑在此处实现
// 包括：设置/清除最终数字，设置/清除备选项，状态前进/后退，自动辅助计算
export class Game {
  // 操作的历史记录
  boards: Board[] = [new Board()]
  // index in history
  cur_idx: number = 0

  constructor() {}

  clear() {
    this.boards = [new Board()]
    this.cur_idx = 0
  }

  current(): Board {
    return this.boards[this.cur_idx]
  }

  // 设置一个数
  setNumber(x: number, y: number, num: number) {
    // clone cur_idx board
    const s = JSON.stringify(this.boards[this.cur_idx])
    const board: Board = JSON.parse(s)

    // 追加到历史操作记录中
    this.cur_idx++
    this.boards.splice(this.cur_idx, Infinity, board)
    board.seq = this.cur_idx

    // 在新的board上做操作

    // 设置数字
    const cell = board.cells[x][y]
    cell.setNumber(num)

    // 干掉其他的竞争对手
    for (const c of board.col_groups[x]) {
      if (c !== cell) {
        c.removeCandidate(num)
      }
    }
    for (const c of board.row_groups[y]) {
      if (c !== cell) {
        c.removeCandidate(num)
      }
    }
    for (const c of board.getCellsInBlock(x % 3, Math.floor(x / 3))) {
      if (c !== cell) {
        c.removeCandidate(num)
      }
    }

    // TODO: 根据已经决定的数字，找到唯一候选，以及进阶的集合排除法
  }

  go_back() {
    if (this.cur_idx == 0) {
      throw new Error("Can't go back")
    } else {
      this.cur_idx--
    }
  }

  go_forward() {
    if (this.cur_idx == this.boards.length - 1) {
      throw new Error("Can't go forward")
    } else {
      this.cur_idx++
    }
  }
}

// pinia状态
export const getStatus = defineStore('status', () => {
  const key = 'sudoku-board'
  const s = localStorage.getItem(key)
  const _game = s == null ? new Game() : (JSON.parse(s) as Game)
  const game = ref(_game)

  function setNumber(x: number, y: number, n: number) {
    _game.setNumber(x, y, n)
  }

  function clear() {
    _game.clear()
  }

  watch(
    game,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return { game, setNumber,clear }
})

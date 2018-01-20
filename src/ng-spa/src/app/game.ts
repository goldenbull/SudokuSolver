// 候选数字0-9，保存单个格子的各种状态
export class Cell {

  // for debug
  id: string;

  // 在整个board中的坐标
  x: number;
  y: number;

  // 选中的数字
  n: number;

  // 备选数字
  candidates: number[];

  // 确定正确的候选数字
  correct_cand: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `[${x} ${y}]`;
    this.reset();
  }

  reset() {
    this.n = null;
    this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.correct_cand = null;
  }

  setNumber(result: number) {
    if (result === 0) {
      this.reset();
    } else {
      this.n = result;
      this.candidates = [];
    }
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    // 边框
    ctx.strokeStyle = 'lightblue';
    ctx.strokeRect(x, y, width, height);

    // 分情况画图
    if (this.n != null) {
      // 已选中
      ctx.fillStyle = 'black';
      ctx.font = `${width}px arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.n.toString(), x + width / 2, y + width / 2);
    } else {
      // 候选数字
      const edge = width / 3;
      ctx.font = `${edge}px arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const c of this.candidates) {
        // 高亮正确的候选数字
        if (c === this.correct_cand) {
          ctx.fillStyle = 'blue';
        } else {
          ctx.fillStyle = 'black';
        }
        ctx.fillText(c.toString(),
          x + Math.trunc((c - 1) % 3) * edge + edge / 2,
          y + Math.trunc((c - 1) / 3) * edge + edge / 2);
      }

      // 没有候选数字，出错了
      if (this.candidates.length === 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x + 2, y + 2, width - 4, height - 4);
      }
    }
  }

  removeCandidate(candi: number) {
    this.candidates = this.candidates.filter(c => c !== candi);
  }
}

export class Board {

  regions: object = {};
  cells: Cell[][] = new Array(9);
  history: [number, number, number][];

  // 初始化
  constructor() {
    this.reset();
  }

  // 从新开始
  reset() {
    // create all cells
    for (let x = 0; x < 9; x++) {
      this.cells[x] = new Array(9);
      for (let y = 0; y < 9; y++) {
        this.cells[x][y] = new Cell(x, y);
      }
    }

    // init all regions
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const cellsInRegion = new Array(9);
        for (let i = 0; i < 9; i++) {
          cellsInRegion[i] = this.cells[x * 3 + Math.floor(i % 3)][y * 3 + Math.floor(i / 3)];
        }
        this.regions[x * 3 + y] = cellsInRegion;
      }
    }

    // init history
    this.history = [];
  }

  // 回退一步，从头开始重算一遍
  revert() {
    if (this.history.length === 0) {
      return;
    }

    const curHistory = this.history;
    curHistory.pop();
    this.reset();
    for (const op of curHistory) {
      this.setNumber(this.cells[op[0]][op[1]], op[2]);
    }
  }

  cellsInCol(x: number): Cell[] {
    if (x < 0 || x >= 9) {
      console.log('column out of range');
      return null;
    }

    return this.cells[x];
  }

  cellsInRow(y: number): Cell[] {
    if (y < 0 || y >= 9) {
      console.log('row out of range');
      return null;
    }
    return this.cells.map(c => c[y]);
  }

  cellsInRegion(x: number, y: number): Cell[] {
    if (x < 0 || x >= 3 || y < 0 || y >= 3) {
      console.log('region index out of range');
      return null;
    }
    return this.regions[x * 3 + y];
  }

  get_cell(x: number, y: number): Cell {
    if (x < 0 || x >= 9 || y < 0 || y >= 9) {
      return null;
    } else {
      return this.cells[x][y];
    }
  }

  draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    console.log('redraw board');

    // clear
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    // 外边框
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(0, 0, width, height);

    // cells
    let edge = width / 9;
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        this.cells[x][y].draw(ctx, edge * x, edge * y, edge, edge);
      }
    }

    // regions
    ctx.strokeStyle = 'blue';
    edge = width / 3;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        ctx.strokeRect(edge * x, edge * y, edge, edge);
      }
    }
  }

  // 设置一个数，0表示clear TODO:清除功能和回退功能加在一起，比较复杂
  setNumber(cell: Cell, result: number) {
    cell.setNumber(result);

    // 干掉其他的竞争对手
    for (const c of this.cellsInCol(cell.x)) {
      if (c !== cell) {
        c.removeCandidate(result);
      }
    }
    for (const c of this.cellsInRow(cell.y)) {
      if (c !== cell) {
        c.removeCandidate(result);
      }
    }
    for (const c of this.cellsInRegion(Math.floor(cell.x / 3), Math.floor(cell.y / 3))) {
      if (c !== cell) {
        c.removeCandidate(result);
      }
    }
  }
}

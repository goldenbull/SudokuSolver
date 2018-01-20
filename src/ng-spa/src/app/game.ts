interface IDrawCanvas {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number);
}

// 候选数字0-9，保存单个格子的各种状态
class Cell implements IDrawCanvas {

  n: number | null;
  candidates: number[];

  constructor() {
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    // 边框
    ctx.strokeStyle = 'lightblue';
    ctx.strokeRect(x, y, width, height);

    // 候选数字
    const edge = width / 3;
    ctx.font = `${edge}px arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let n = 0; n < 9; n++) {
      ctx.fillText((n + 1).toString(),
        x + Math.trunc(n % 3) * edge + edge / 2,
        y + Math.trunc(n / 3) * edge + edge / 2);
    }
  }
}

export class Board implements IDrawCanvas {

  regions: object = {};
  cells: Cell[][] = new Array(9);

  // 初始化
  constructor() {
    // create all cells
    for (let x = 0; x < 9; x++) {
      this.cells[x] = new Array(9);
      for (let y = 0; y < 9; y++) {
        this.cells[x][y] = new Cell();
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

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    // 外边框
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(0, 0, width, height);

    // cells
    let edge = width / 9;
    for (let x1 = 0; x1 < 9; x1++) {
      for (let y1 = 0; y1 < 9; y1++) {
        this.cells[x][y].draw(ctx, edge * x1, edge * y1, edge, edge);
      }
    }

    // regions
    ctx.strokeStyle = 'blue';
    edge = width / 3;
    for (let x1 = 0; x1 < 3; x1++) {
      for (let y1 = 0; y1 < 3; y1++) {
        ctx.strokeRect(edge * x1, edge * y1, edge, edge);
      }
    }
  }
}

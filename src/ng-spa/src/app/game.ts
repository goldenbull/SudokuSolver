import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

interface IDrawCanvas {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number);
}

class Cell implements IDrawCanvas {
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

class Region implements IDrawCanvas {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(x, y, width, height);
  }
}

export class Board implements IDrawCanvas {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    // 外边框
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(0, 0, width, height);

    // cells
    const cell = new Cell();
    let edge = width / 9;
    for (let x1 = 0; x1 < 9; x1++) {
      for (let y1 = 0; y1 < 9; y1++) {
        cell.draw(ctx, edge * x1, edge * y1, edge, edge);
      }
    }

    // regions
    const region = new Region();
    edge = width / 3;
    for (let x1 = 0; x1 < 3; x1++) {
      for (let y1 = 0; y1 < 3; y1++) {
        region.draw(ctx, edge * x1, edge * y1, edge, edge);
      }
    }
  }
}

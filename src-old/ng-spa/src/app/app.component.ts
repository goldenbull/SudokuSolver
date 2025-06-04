import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Board, Cell} from './game';
import {PopupFormComponent} from './popup-form/popup-form.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // canvas 相关
  @ViewChild('mycanvas') public canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  // 游戏逻辑模块
  board = new Board();
  board_size = 600;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.canvas.nativeElement.width = this.board_size;
    this.canvas.nativeElement.height = this.board_size;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.translate(0.5, 0.5);
    this.drawBoard();
  }

  resizeBoard() {
    this.canvas.nativeElement.width = this.board_size;
    this.canvas.nativeElement.height = this.board_size;
    this.drawBoard();
  }

  // 重画整个board
  drawBoard() {
    this.board.draw(this.ctx, this.board_size - 1, this.board_size - 1);
  }

  restart() {
    if (confirm('重新开始？')) {
      this.board.reset();
      this.drawBoard();
    }
  }

  revert() {
    this.board.revert();
    this.drawBoard();
  }

  cellAtPos(offsetX: number, offsetY: number): Cell {
    const x = Math.floor(offsetX / this.board_size * 9);
    const y = Math.floor(offsetY / this.board_size * 9);
    return this.board.get_cell(x, y);
  }

  // 点击一个格，弹出数字选择框
  public onclick(e: MouseEvent): void {
    // 得到选中的cell
    const cell = this.cellAtPos(e.offsetX, e.offsetY);
    if (cell == null || cell.n != null) {
      return;
    }

    // 弹出选择框
    const edge = Math.floor(this.board_size / 9 * 2);
    const dialogRef = this.dialog.open(PopupFormComponent, {
      panelClass: 'popup-dlg',
      position: {left: `${e.clientX}px`, top: `${e.clientY}px`},
      height: `${edge}px`,
      width: `${edge}px`,
      data: {cell: cell, edge: edge}
    });

    // 处理返回结果
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      this.board.setNumber(cell, result);
      this.drawBoard();
    });
  }
}

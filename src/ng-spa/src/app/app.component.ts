import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Board} from './game';
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
  x = 0;
  y = 0;

  // debug
  _dbgTxt1: string;
  _dbgTxt2: string;

  // 游戏逻辑模块
  board = new Board();
  board_size = 810;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.canvas.nativeElement.width = this.board_size;
    this.canvas.nativeElement.height = this.board_size;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.translate(0.5, 0.5);
    this.drawBoard();
  }

  // 重画整个board
  drawBoard() {
    this.board.draw(this.ctx, 0, 0, this.board_size - 1, this.board_size - 1);
  }

  // debug
  public onmousemove(e: MouseEvent): void {
    this.x = e.offsetX;
    this.y = e.offsetY;
  }

  // 点击一个格，弹出数字选择框
  public onclick(e: MouseEvent): void {
    this._dbgTxt1 = `clicked at ${e.offsetX} ${e.offsetY}`;

    const dialogRef = this.dialog.open(PopupFormComponent, {
      width: '250px',
      data: {v1: 123, v2: 'hello'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result === undefined) {
        this._dbgTxt2 = 'no data return from dialog';
      } else {
        this._dbgTxt2 = result;
      }
    });
  }
}

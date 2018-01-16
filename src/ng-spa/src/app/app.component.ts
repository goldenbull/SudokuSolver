import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Board} from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('mycanvas') public canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  x = 0;
  y = 0;

  _dbgTxt: string;

  board = new Board();
  board_size = 810;

  constructor() {
  }

  ngOnInit() {
    this.canvas.nativeElement.width = this.board_size;
    this.canvas.nativeElement.height = this.board_size;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.translate(0.5, 0.5);
    this.drawBoard();
  }

  drawBoard() {
    this.board.draw(this.ctx, 0, 0, this.board_size - 1, this.board_size - 1);
  }

  public onmousemove(e: MouseEvent): void {
    this.x = e.offsetX;
    this.y = e.offsetY;
  }

  public onclick(e: MouseEvent): void {
    this._dbgTxt = `clicked at ${e.offsetX} ${e.offsetY}`;
  }
}

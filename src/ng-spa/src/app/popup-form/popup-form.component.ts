import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cell} from '../game';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {

  @ViewChild('cv') canvas: ElementRef;

  cell: Cell;
  edge: number;

  constructor(public dialogRef: MatDialogRef<PopupFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cell = data.cell;
    this.edge = Math.floor(data.edge);
  }

  ngOnInit(): void {
    this.canvas.nativeElement.width = this.edge;
    this.canvas.nativeElement.height = this.edge;
    const ctx = this.canvas.nativeElement.getContext('2d');
    const edge = this.edge / 3;
    ctx.font = `${edge}px arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const n = x + y * 3 + 1;
        if (this.cell.candidates.indexOf(n) >= 0) {
          ctx.fillText(n.toString(),
            Math.trunc(x * edge + edge / 2),
            Math.trunc(y * edge + edge / 2));
        }
      }
    }
  }

  onclick(e: MouseEvent): void {
    // 根据点击位置得到数字
    const x = Math.floor(e.offsetX / (this.edge / 3));
    const y = Math.floor(e.offsetY / (this.edge / 3));
    const n = x + y * 3 + 1;
    console.log({x, y, n});
    if (this.cell.candidates.indexOf(n) >= 0) {
      this.dialogRef.close(n);
    }
  }
}

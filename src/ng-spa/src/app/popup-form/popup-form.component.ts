import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cell} from '../game';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {

  @ViewChild('selectNum') public canvas: ElementRef;

  cell: Cell;
  edge: number;

  constructor(public dialogRef: MatDialogRef<PopupFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cell = data.cell;
    this.edge = data.edge;
  }

  ngOnInit(): void {
    console.log(this.edge);
    this.canvas.nativeElement.width = this.edge;
    this.canvas.nativeElement.height = this.edge;
    const ctx = this.canvas.nativeElement.getContext('2d');
  }

  onclick(): void {
    this.dialogRef.close(9);
  }
}

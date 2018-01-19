import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {

  v1: number;
  v2: string;

  constructor(public dialogRef: MatDialogRef<PopupFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.v1 = data.v1;
    this.v2 = data.v2;
  }

  ngOnInit(): void {
  }

  onclick(): void {
    this.dialogRef.close('this is result from dialog');
  }
}

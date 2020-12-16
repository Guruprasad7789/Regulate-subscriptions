
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface ILoginData{
  errorMessage: string;
  dialogDistinguish: number;
  email: string;
}
@Component({

  template: `<h1 mat-dialog-title>Subscriptions</h1>
  <div *ngIf="data.dialogDistinguish===0" mat-dialog-content>
    {{data.errorMessage}}
  </div>
  <div *ngIf="data.dialogDistinguish===1" mat-dialog-content>
    <mat-form-field  class="w-100">
      <mat-label>Enter your email</mat-label>
      <input type="text" matInput [(ngModel)]="data.email" required>
    </mat-form-field>
  </div>

  <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end center">
    <button mat-raised-button color="accent" (click)="dialogClose()" >{{data.email.length>0?'Send':'Close'}}</button>
  </div>`

})
export class MatErrorComponent{

  constructor(public dialogRef: MatDialogRef<MatErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ILoginData) {
    console.log(data);
  }
public  dialogClose(): void{
    if (this.data.email.length > 0)
    {
      const data = {email: this.data.email, buttonClicked: true};
      this.dialogRef.close(data);
        }
    else{
      const data = {email: null, buttonClicked: false};
      this.dialogRef.close(data);
    }

  }

}

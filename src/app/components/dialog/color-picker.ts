import {Component} from '@angular/core';
import {Color, ColorEvent} from 'ngx-color';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Models } from '../../model/models';
import { Inject } from '@angular/core';
import { IColorDialog } from '../container/add-subscription/add-subscription.component';
@Component({
    template: `<div *ngIf="colorPickerData.dialog===0" class="dialog-container">
        <div>
        <color-circle (onChange)="handleChange($event)">
        </color-circle>
        </div>
        <hr>

        <div fxLayout="row" fxLayoutAlign="space-around center" class="mt-2" > 
        <div *ngFor="let item of [].constructor(5)">
        <button class="color-variant-button"></button>
        </div>
        </div>
        <div fxLayout="row" fxLayoutAlign="space-between center">
        <button (click)="openCustomColorPicker()" >Custom</button>
        <button (click)="closeDialogAndSendData()" >Select</button>
          </div>
    </div>
    <div *ngIf="colorPickerData.dialog===1" class="dialog-container">
    <color-sketch (onChange)="handleChange($event)"></color-sketch>
    
    <div class="mt-2" fxLayout="row" fxLayoutAlign="start center">
    <div [style.background]="previousColor" class="colorChangeView"></div>
    <span class="material-icons">
    arrow_forward
    </span>
    <div [style.background]="nextColor" class="colorChangeView"></div>
    </div>

    <div class="mt-2" fxLayout="row" fxLayoutAlign="space-between center">
    <button mat-dialog-close>Back</button>
    <button (click)="onCustomSelect()">Select</button>
    </div>
    </div>
    `,
    styles: [`
        .colorChangeView{
            width:65px;
            height:30px;
            border:2px solid #000;
        }
        .color-variant-button{
            height: 30px;
            width: 30px;
            border-radius: 50%;
            background-color: red;
            border: 1px solid #000;
        }
      `]
})
export class ColorPickerComponent{
   private hexColor: string=this.colorPickerData.color;
   private previousColor:string=this.hexColor;
   private nextColor:string="#fff";
   private color:Color;
    constructor(
        @Inject(MAT_DIALOG_DATA) public colorPickerData: IColorDialog,
        private dialogref: MatDialogRef<ColorPickerComponent>,
        private dialog: MatDialog
    ) {
    }
    handleChange($event: ColorEvent) {
        this.hexColor = $event.color.hex;
        this.nextColor=$event.color.hex;
        this.color=$event.color;
    }
    public closeDialogAndSendData(): void{
        this.dialogref.close(this.color);
    }
    public openCustomColorPicker(): void {
        const data :IColorDialog= {
            dialog:Models.colorPicker.customColorPicker,
            color:this.colorPickerData.color
        };
        this.dialog.open(ColorPickerComponent, {data}).afterClosed().subscribe((color:Color)=>{
            this.dialogref.close(color);

                });
    }
    public onCustomSelect():void{
        this.dialogref.close(this.color);
    }
}

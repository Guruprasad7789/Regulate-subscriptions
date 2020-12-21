import {Component} from '@angular/core';
import {Color, ColorEvent} from 'ngx-color';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Models } from '../../model/models';
import { Inject } from '@angular/core';
import { IColorDialog } from '../container/add-subscription/add-subscription.component';
import {HslToHexPipe} from '../../pipes/hslToHex.pipe';


@Component({
    template: `<div *ngIf="colorPickerData.dialog===0" class="dialog-container">
        <div>
        <color-circle (onChange)="handleChange($event)">
        </color-circle>
        </div>
        <hr>

        <div fxLayout="row" fxLayoutAlign="space-around center" class="mt-2" >
        <div *ngFor="let item of [].constructor(5);let i=index">
        <button [style.background]="hexColorOfFiveButton[i]" (click)="appendToHexColor(hexColorOfFiveButton[i])" class="color-variant-button"></button>
        </div>
        </div>
        <div class="mt-4" fxLayout="row" fxLayoutAlign="space-between center">
        <button class="button" (click)="openCustomColorPicker()" >Custom</button>
        <button class="button" (click)="closeDialogAndSendData()" >Select</button>
          </div>
    </div>
    <div *ngIf="colorPickerData.dialog===1" class="dialog-container">
    <color-sketch width="220px" height="220px" (onChange)="handleChange($event)"></color-sketch>

    <div class="mt-2" fxLayout="row" fxLayoutAlign="start center">
    <div [style.background]="previousColor" class="colorChangeView"></div>
    <span class="material-icons">
    arrow_forward
    </span>
    <div [style.background]="nextColor" class="colorChangeView"></div>
    </div>

    <div class="mt-4" fxLayout="row" fxLayoutAlign="space-between center">
    <button class="button" mat-dialog-close>Back</button>
    <button class="button" (click)="onCustomSelect()">Select</button>
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
            border: 1px solid #000;
        }
        .colorSketch{
            min-height: 400px;
            min-width: 400px;
        }
        .button{
            background: none;
            color:#0066ff;
        }
      `]
})
export class ColorPickerComponent{
   private hexColor: string = this.colorPickerData.color;
   private previousColor: string = this.hexColor;
   private nextColor = '#fff';
   private color: Color;
   public colorArray: number[] = new Array(5);
   private hexColorOfFiveButton: string[] = new  Array(5);
    public saturation: number;
    constructor(
        @Inject(MAT_DIALOG_DATA) public colorPickerData: IColorDialog,
        private dialogref: MatDialogRef<ColorPickerComponent>,
        private dialog: MatDialog
    ) {
    }
    handleChange($event: ColorEvent) {
        this.hexColor = $event.color.hex;
        this.nextColor = $event.color.hex;
        this.color = $event.color;
        const h = $event.color.hsl.h;
        const s = $event.color.hsl.s * 100;
        const l = $event.color.hsl.l * 100;
        this.findValueOfColorArray(h, s, l);

    }
    public closeDialogAndSendData(): void{
        this.dialogref.close(this.color);
    }
    public openCustomColorPicker(): void {
        const data: IColorDialog = {
            dialog: Models.colorPicker.customColorPicker,
            color: this.colorPickerData.color
        };
        this.dialog.open(ColorPickerComponent, {data}).afterClosed().subscribe((color: Color) => {
            this.dialogref.close(color);

                });
    }
    public onCustomSelect(): void{
        this.dialogref.close(this.color);
    }
   public findValueOfColorArray(hue: number, saturation: number, lightness: number): void{
        const lightnessDiffFromHundred = 100 - lightness;
        const lightnessPerColorVariant = lightnessDiffFromHundred / 5;
        for (let i = 4; i >= 0; i--){
            lightness = lightness + lightnessPerColorVariant;
            this.hexColorOfFiveButton[i] = new HslToHexPipe().transform(hue, saturation, lightness);
        }
    }
    public appendToHexColor(hexColor: string): void{
            this.dialogref.close(hexColor);

    }
}

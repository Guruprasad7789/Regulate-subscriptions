import {Component} from '@angular/core';
import {Color, ColorEvent} from 'ngx-color';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
    template: `<div class="dialog-container">
        <div>
        <color-circle (onChange)="handleChange($event)">
        </color-circle>
        </div>
        <hr>


        <div fxLayout="row" fxLayoutAlign="space-between center">
            <input hidden="true" class="color" #colorInput type="color" [(ngModel)]="colorEvent">
            <button [ngStyle]="{'background-color': colorEvent}">Select</button>
            <button (click)="closeDialogAndSendData()" >Select</button>
            
        </div>
    </div>`,
    styles: [`
        input[type="color"] {
            display: block;
            width: 100px;
            height: 40px;
            border: none;
        }
      `]
})
export class ColorPickerComponent{
   private colorEvent: string;
    constructor(
        private dialogref: MatDialogRef<ColorPickerComponent>
    ) {
    }
    handleChange($event: ColorEvent) {
        this.colorEvent = $event.color.hex;
        // color = {
        //   hex: '#333',
        //   rgb: {
        //     r: 51,
        //     g: 51,
        //     b: 51,
        //     a: 1,
        //   },
        //   hsl: {
        //     h: 0,
        //     s: 0,
        //     l: .20,
        //     a: 1,
        //   },
        // }
    }
    public closeDialogAndSendData(): void{
        this.dialogref.close(this.colorEvent);
    }

}

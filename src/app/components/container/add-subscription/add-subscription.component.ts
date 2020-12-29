import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SubscriptionCrudService } from 'src/app/services/subscriptionCrud.service';
import {MatDialog} from '@angular/material/dialog';
import {ColorPickerComponent} from '../../dialog/color-picker';
import {Color} from 'ngx-color';
import { Models } from '../../../model/models';
import { ColorInversionPipe } from 'src/app/pipes/color-inversion.pipe';
import {AddLabelComponent} from '../../dialog/add-label';
export interface IColorDialog{
  dialog: Models.colorPicker;
  color: string;
}
@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
public addSubscriptionForm: FormGroup;
public colorInput = '#c5c5c5';
public textColor = '#000';
  constructor(
      private formBuilder: FormBuilder,
      private readonly subscriptionCrudService: SubscriptionCrudService,
      private readonly dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.validateAddSubscriptionForm();
  }
  public validateAddSubscriptionForm(): void{
    this.addSubscriptionForm = this.formBuilder.group({
      moneySpend: ['', Validators.required],
      subscriptionName: ['', Validators.required],
      description: [''],
      noOfRecurring: ['1'],
      subscriptionSpan: ['week'],
      firstPaymentDetails: [''],
      expiryDateOneTime: [''],
      color: [''],
      paymentInfo: [''],
      note: ['']
    });
  }
 public saveSubscription(): void{
    this.subscriptionCrudService.addSubscriptionData(this.addSubscriptionForm.value).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);

    });
    console.log(this.addSubscriptionForm.value);
  }
  public isFormValid(){
    return this.addSubscriptionForm.valid;
  }
    public openColorPicker(): void{
        const data: IColorDialog = {
          dialog: Models.colorPicker.circleColorPicker,
          color: this.colorInput
        };
        this.dialog.open(ColorPickerComponent, { data }).afterClosed().subscribe((color: Color | string) => {
      if ( typeof color === 'object'){
      this.colorInput = color.hex;
      this.findTextInputColor(color.hsl.l);
          }
      else {
          this.colorInput = color;
      }
      });
}
// To change Color input field text color based on background color
public findTextInputColor(lightness: number): void{
this.textColor = new ColorInversionPipe().transform(lightness);
}

// To open label dialog
    public openAddLabel(): void{
     this.dialog.open(AddLabelComponent, {   maxWidth: '100vw',
         maxHeight: '100vh',
         height: '100%',
         width: '100%'});
    }
}

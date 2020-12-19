import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SubscriptionCrudService } from 'src/app/services/subscriptionCrud.service';
import {MatDialog} from '@angular/material/dialog';
import {ColorPickerComponent} from '../../dialog/color-picker';
import {Color} from 'ngx-color';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
public addSubscriptionForm: FormGroup;
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
      noOfRecurring: [''],
      subscriptionSpan: [''],
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
      this.dialog.open(ColorPickerComponent).afterClosed().subscribe((color: Color) => {
          console.log(color);
      });
}
}

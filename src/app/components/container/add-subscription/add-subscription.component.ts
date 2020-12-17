import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
color = '#000';
public addSubscriptionForm: FormGroup;
  constructor(
      private formBuilder: FormBuilder
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
}

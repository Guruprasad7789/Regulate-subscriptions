import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
color = '#000';
  constructor() { }

  ngOnInit() {
    setInterval(function(){
      this.color = '#dcdcdc';
    }, 2000);
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpCacheService} from "../../../services/http-cache.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private showCachedData:HttpCacheService) {
    this.showCachedData.displayCachedData=true;
  }

  ngOnInit() {}

}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiDataService} from "../../services/api-data.service";

@Component({
  selector: 'app-humidity-gauge',
  templateUrl: './humidity-gauge.component.html',
  styleUrls: ['./humidity-gauge.component.css']
})
export class HumidityGaugeComponent {

  humidityThresholds = {
    0: {color: 'yellow'},
    30: {color: 'green'},
    50: {color: 'blue'}
  };

  constructor(private data: ApiDataService) { }

  getHumidity(): number {
    return this.data.getHumidity();
  }

}

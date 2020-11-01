import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiDataService} from "../../services/api-data.service";

@Component({
  selector: 'app-temperature-gauge',
  templateUrl: './temperature-gauge.component.html',
  styleUrls: ['./temperature-gauge.component.css']
})
export class TemperatureGaugeComponent {

  temperatureThresholds = {
    0: {color: 'blue'},
    18: {color: 'green'},
    23: {color: 'red'}
  };

  constructor(private data: ApiDataService) { }

  getTemp(): number {
    return Math.round(this.data.getTemperature()*10)/10;
  }

}

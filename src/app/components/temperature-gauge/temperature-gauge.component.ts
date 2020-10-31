import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-temperature-gauge',
  templateUrl: './temperature-gauge.component.html',
  styleUrls: ['./temperature-gauge.component.css']
})
export class TemperatureGaugeComponent implements OnInit {
  temp = 0;

  temperatureThresholds = {
    0: {color: 'blue'},
    18: {color: 'green'},
    23: {color: 'red'}
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://api.smartroom.codeweb.nl?key=' + localStorage.getItem('key'))
      .subscribe((data: { temperature: number }) => {
        this.temp = Math.round(data.temperature*10)/10;
      });
  }

}

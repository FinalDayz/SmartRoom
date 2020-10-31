import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-humidity-gauge',
  templateUrl: './humidity-gauge.component.html',
  styleUrls: ['./humidity-gauge.component.css']
})
export class HumidityGaugeComponent implements OnInit {
  humid = 0;

  humidityThresholds = {
    0: {color: 'yellow'},
    30: {color: 'green'},
    50: {color: 'blue'}
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://api.smartroom.codeweb.nl?key=' + localStorage.getItem('key'))
      .subscribe((data: { humidity: number }) => {
        this.humid = data.humidity;
      });
  }

}

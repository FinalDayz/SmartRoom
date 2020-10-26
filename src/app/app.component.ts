import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'SmartRoom';
  temp = 0;
  humid = 0;
  cols = 0;
  rowHeight = null;
  rowspan = 1;

  heater = null;
  temperatureThresholds = {
    0: {color: 'blue'},
    18: {color: 'green'},
    23: {color: 'red'}
  };

  humidityThresholds = {
    0: {color: 'yellow'},
    30: {color: 'green'},
    50: {color: 'blue'}
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://api.smartroom.codeweb.nl')
      .subscribe((data: { temperature: number, humidity: number }) => {
        this.temp = Math.round(data.temperature*10)/10;
        this.humid = data.humidity;
      });

    this.http.get('http://api.smartroom.codeweb.nl/status?key=28418aa3380552a0b8edddf26fa8b68e0bf5303c678bb8bcbdcf00781da700ed')
      .subscribe((data: { heater: boolean }) => {
        this.heater = data.heater;
      });
    this.setSizes();
  }

  onResize(event) {
    this.setSizes();
  }

  setSizes() {
    if(window.innerWidth <= 400) {
      this.cols = 1;
      this.rowHeight = '7.5rem';
      this.rowspan = 3;
    } else {
      this.cols = 2;
      this.rowHeight = '2:1';
      this.rowspan = 1;
    }
  }

  clickHeaterOn(): void {
    this.http.post('http://api.smartroom.codeweb.nl/set/heater',
      {
        key: '28418aa3380552a0b8edddf26fa8b68e0bf5303c678bb8bcbdcf00781da700ed',
        heater: true
      })
      .subscribe((data: { heater: boolean }) => {
        this.heater = data.heater;
      });
  }

  clickHeaterOff(): void {
    this.http.post('http://api.smartroom.codeweb.nl/set/heater',
      {
        key: '28418aa3380552a0b8edddf26fa8b68e0bf5303c678bb8bcbdcf00781da700ed',
        heater: false
      })
      .subscribe((data: { heater: boolean }) => {
        this.heater = data.heater;
      });
  }

  handleToggleChange(): void {
    if (this.heater === false) {
      this.clickHeaterOn();
    } else {
      this.clickHeaterOff();
    }
  }
}

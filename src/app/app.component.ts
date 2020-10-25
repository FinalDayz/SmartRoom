import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartRoom';
  temp = '--';
  humid = '--';

  heater = null;

  constructor(private http: HttpClient) {
    console.log(http);
    http.get('http://api.smartroom.codeweb.nl')
      .subscribe((data: { temperature: number, humidity: number }) => {
        this.temp = '' + data.temperature;
        this.humid = '' + data.humidity;

      });

    http.get('http://api.smartroom.codeweb.nl/status?key=28418aa3380552a0b8edddf26fa8b68e0bf5303c678bb8bcbdcf00781da700ed')
      .subscribe((data: { heater: boolean }) => {
        console.log(data);
        this.heater = data.heater;
      });

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
}

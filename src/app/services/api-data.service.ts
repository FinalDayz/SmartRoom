import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  public liveData: {temperature: number, humidity: number};

  constructor(private http: HttpClient) {
    this.liveData = {
      temperature: 0,
      humidity: 0,
    };
    setInterval(() => this.fetchData(), 5000);
    this.fetchData();
  }

  fetchData() {
    console.log(this.http);
    this.http.get('http://api.smartroom.codeweb.nl?key=' + localStorage.getItem('key'))
      .subscribe((data: { temperature: number, humidity: number }) => {
        this.liveData = data;
      });
  }

  getTemperature(): number {
    return this.liveData.temperature;
  }

  getHumidity(): number {
    return this.liveData.humidity;
  }

}

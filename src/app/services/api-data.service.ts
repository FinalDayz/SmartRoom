import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  public liveData: { temperature: number, humidity: number, pressure: number };
  public url;
  private defaultUrl = 'http://api.smartroom.codeweb.nl?key=';

  constructor(private http: HttpClient) {
    this.setCurrentTab();
    this.liveData = {
      temperature: 0,
      humidity: 0,
      pressure: 0,
    };
    setInterval(() => this.fetchData(), 5000);
    this.fetchData();
  }

  private fetchData(): void {
    console.log(this.http);
    this.http.get(this.url + localStorage.getItem('key'))
      .subscribe((data: { temperature: number, humidity: number, pressure: number, }) => {
        this.liveData = data;
      });
  }

  getTemperature(): number {
    return this.liveData.temperature;
  }

  getHumidity(): number {
    return this.liveData.humidity;
  }

  getPressure(): number {
    return this.liveData.pressure;
  }

  public setCurrentTab(tab?: string): void {
    switch (tab) {
      case 'stefan':
        this.url = this.defaultUrl;
        break;
      case 'valerie':
        this.url = 'http://api.monitor-room.codeweb.nl?key=';
        break;
      default:
        this.url = this.defaultUrl;
        break;
    }
    this.fetchData();
  }

}

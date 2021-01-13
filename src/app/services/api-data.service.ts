import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface FetchData {
  temperature: number;
  humidity: number;
  pressure: number;
  gas?: number;
}

@Injectable({
  providedIn: 'root'
})


export class ApiDataService {

  public liveData: FetchData;
  public url;
  private readonly defaultUrl = 'http://api.smartroom.codeweb.nl';

  constructor(private http: HttpClient) {
    this.setCurrentTab();
    this.liveData = {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      gas: 0,
    };
    setInterval(() => this.fetchData(), 5000);
    this.fetchData();
  }

  private fetchData(): void {
    this.http.get(this.url, {
      headers: {
        "Authorization": localStorage.getItem('key')
      }
    })
      .subscribe((data: FetchData) => {
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

  getToxicGas(): number|null {
    return this.liveData.gas;
  }

  public setCurrentTab(tab?: string): void {
    switch (tab) {
      case 'stefan':
        this.url = this.defaultUrl;
        break;
      case 'valerie':
        this.url = 'http://api.monitor-room.codeweb.nl';
        break;
      default:
        this.url = this.defaultUrl;
        break;
    }
    this.fetchData();
  }

}

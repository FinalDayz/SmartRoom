import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import Automation from "../models/Automation";
import {Subscribable} from "rxjs";

export interface FetchData {
  heater?: number;
  temperature: number;
  humidity: number;
  pressure: number;
  gas?: number;
  lastConnection?: string
}

interface Config {
  url: string,
  hasAutomations: boolean
}

@Injectable({
  providedIn: 'root'
})

export class ApiDataService {

  public static readonly valerieConfig: Config = {
    url: "http://api.monitor-room.codeweb.nl",
    hasAutomations: false,
  };

  public static readonly stefanConfig: Config = {
    url: "http://api.smartroom.codeweb.nl",
    hasAutomations: true,
  };

  private automations: Array<Automation> = [];
  public liveData: FetchData;
  private currentConfig: Config = ApiDataService.stefanConfig;

  public automationPromise: Promise<Array<Automation>>;
  private automationGotData: (auto: Array<Automation>) => void;

  constructor(private http: HttpClient) {
    this.setCurrentTab();
    this.liveData = {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      gas: 0,
      lastConnection: '',
      heater: 0,
    };
    setInterval(() => this.fetchData(), 5000);
    this.fetchData();
    this.fetchAutomations();
    this.automationPromise = new Promise<Array<Automation>>((acc, _) => {
      this.automationGotData = acc;
    })
  }

  gotData(data: FetchData) {
    this.liveData = data;
  }

  private fetchAutomations() {
    this.http.get(this.currentConfig.url + "/automation/all",
      this.getRequestOptions()
    )
      .subscribe((data: Array<Automation>) => {
        this.automations = data;
        const decodedAutomations = [];
        for (const automation of this.automations) {
          decodedAutomations.push(this.decodeAutomation(automation));
        }

        this.automationGotData(decodedAutomations);
      });
  }

  private fetchData(): void {
    this.http.get(this.currentConfig.url,
      this.getRequestOptions()
    )
      .subscribe((data: FetchData) => {
        this.liveData = data;
      });
  }

  getHeater(): number {
    return this.liveData.heater
  }

  getAutomations(): Array<Automation> {
    return this.automations;
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

  getToxicGas(): number | null {
    return this.liveData.gas;
  }

  getLastConnection(): string | null {
    return this.liveData.lastConnection;
  }

  private setConfig(config) {
    this.currentConfig = config;
  }

  public setCurrentTab(tab?: string): void {
    switch (tab) {
      case 'stefan':
        this.setConfig(ApiDataService.stefanConfig);
        break;
      case 'valerie':
        this.setConfig(ApiDataService.valerieConfig);
        break;
      default:
        this.setConfig(ApiDataService.stefanConfig);
        break;
    }
    this.fetchData();
  }

  private decodeAutomation(automation: any) {
    automation.ifs = JSON.parse(automation.ifs);
    // automation.action = JSON.parse(automation.action)[0];
    automation.actions = JSON.parse(automation.actions);

    return automation;
  }

  private getRequestOptions(extraData?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }) {
    return {
      ...extraData,
      headers: {
        "Authorization": localStorage.getItem('key'),
        ...extraData?.headers
      },
    };
  }

  deleteAutomation(automation: Automation) {
    return this.http.delete(this.currentConfig.url + "/automation/delete/" + automation.id,
      this.getRequestOptions()
    );
  }

  modifyAutomation(automation: Automation) {
    const event = this.http.put(this.currentConfig.url + "/automation/modify/" + automation.id,
      JSON.stringify(automation),
      this.getRequestOptions());

    return event;
  }

  addAutomation(automation: Automation): Subscribable<Automation> {
    const event = this.http.post(this.currentConfig.url + "/automation/add",
      JSON.stringify(automation),
      this.getRequestOptions()
    );

    return event;
  }

  changeHeater(state: boolean) {
    this.liveData.heater = state ? 1 : 0;
    this.http.post(this.currentConfig.url + "/set/heater",
      {
        heater: state
      },
      this.getRequestOptions()
    )
      .subscribe((data: FetchData) => {
        this.gotData(data);
      });
  }
}

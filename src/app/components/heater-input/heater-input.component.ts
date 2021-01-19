import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiDataService, FetchData} from "../../services/api-data.service";

@Component({
  selector: 'app-heater-input',
  templateUrl: './heater-input.component.html',
  styleUrls: ['./heater-input.component.css']
})
export class HeaterInputComponent {

  constructor(
    private data: ApiDataService,
    private http: HttpClient
  ) { }

  getHeater() {
    return this.data.getHeater();
  }

  setHeater(state: boolean): void {
    this.data.changeHeater(state);
  }

  handleToggleChange(): void {
    this.setHeater(!this.getHeater());
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiDataService, FetchData} from "../../services/api-data.service";

@Component({
  selector: 'app-heater-input',
  templateUrl: './heater-input.component.html',
  styleUrls: ['./heater-input.component.css']
})
export class HeaterInputComponent implements OnInit {

  constructor(
    private data: ApiDataService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.http.get('http://api.smartroom.codeweb.nl/status',
    //   {
    //     headers: {
    //       "Authorization": localStorage.getItem('key')
    //     }
    //   })
    //   .subscribe((data: { heater: boolean }) => {
    //     this.heater = data.heater;
    //   });
  }

  getHeater() {
    return this.data.getHeater();
  }

  setHeater(state: boolean): void {
    this.http.post('http://api.smartroom.codeweb.nl/set/heater',
      {
        key: localStorage.getItem('key'),
        heater: state
      })
      .subscribe((data: FetchData) => {
        this.data.gotData(data);
      });
  }

  handleToggleChange(): void {
    this.setHeater(!this.getHeater());
  }

}

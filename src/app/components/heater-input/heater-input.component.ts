import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-heater-input',
  templateUrl: './heater-input.component.html',
  styleUrls: ['./heater-input.component.css']
})
export class HeaterInputComponent implements OnInit {
  heater = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://api.smartroom.codeweb.nl/status?key=' + localStorage.getItem('key'))
      .subscribe((data: { heater: boolean }) => {
        this.heater = data.heater;
      });
  }

  setHeater(state: boolean): void {
    this.http.post('http://api.smartroom.codeweb.nl/set/heater',
      {
        key: localStorage.getItem('key'),
        heater: state
      })
      .subscribe((data: { heater: boolean }) => {
        this.heater = data.heater;
      });
  }

  handleToggleChange(): void {
    this.setHeater(!this.heater);
  }

}

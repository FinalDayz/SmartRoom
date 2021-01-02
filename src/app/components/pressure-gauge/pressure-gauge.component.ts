import { Component, OnInit } from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';

@Component({
  selector: 'app-pressure-gauge',
  templateUrl: './pressure-gauge.component.html',
  styleUrls: ['./pressure-gauge.component.css']
})
export class PressureGaugeComponent implements OnInit {

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
  }

  getPressure(): number {
    return this.apiDataService.getPressure();
  }

}

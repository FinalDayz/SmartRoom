import { Component, OnInit } from '@angular/core';
import {ApiDataService} from "../../services/api-data.service";

@Component({
  selector: 'app-toxic-gas-bar',
  templateUrl: './toxic-gas-bar.component.html',
  styleUrls: ['./toxic-gas-bar.component.css']
})
export class ToxicGasBarComponent {

  gasThresholds = {
    0: {color: 'green'},
    10: {color: 'orange'},
    20: {color: 'red'}
  };

  constructor(private data: ApiDataService) { }

  getGasPercentage(): number {
    return this.data.getToxicGas() / 1024.0 * 100;
  }

  getGasPercentageCss(): string
  {
    return this.getGasPercentage() + "";
  }

  geInvertGasPercentageCss(): string
  {
    return (100-this.getGasPercentage()) + "";
  }

  getBarColor() {
    const value = this.getGasPercentage();
    let color;
    for(const [threshold, colorObj] of Object.entries(this.gasThresholds)) {
      if(value > parseInt(threshold)) {
        color = colorObj.color;
      }
    }
    return color;
  }

  getGasPercentageDisplay() {
    return Math.round(this.getGasPercentage());
  }
}

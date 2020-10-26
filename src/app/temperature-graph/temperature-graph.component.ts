import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Label} from "ng2-charts";
import {ChartDataSets, ChartOptions} from "chart.js";

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.css']
})
export class TemperatureGraphComponent implements OnInit {
  public chartLabels: Label[];
  public chartData: ChartDataSets[];

  public lineChartOptions: (ChartOptions | { annotation: any }) = {
    responsive: false,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 10,
          suggestedMax: 30
        }
      }]
    }
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.chartLabels = ["label 1", "label2", "label3", "label3", "label3", "label3", "label3"];
    this.chartData = [
      {data: [20, 20, 21, 21, 22, 20, 16], label: 'This week'},
      {data: [20, 20, 19, 16, 18, 19, 21], label: 'Previous week'},
    ];
  }

}

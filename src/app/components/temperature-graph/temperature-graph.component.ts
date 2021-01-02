import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';

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
        id: 'left-y-axis',
        type: 'linear',
        position: 'left',
        ticks: {
          suggestedMin: 15,
          suggestedMax: 25
        }
      },
        {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right',
          ticks: {
            suggestedMin: 50,
            suggestedMax: 100
          }
        }
      ]
    }
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const hours = 30;
    const toDate = new Date();
    toDate.setMinutes(0);
    const fromDate = new Date(toDate.getTime() - hours * 60 * 60 * 1000);
    this.http.get('http://api.smartroom.codeweb.nl:3031/get/list/temperature/'
      + (Date.now() - fromDate.getTime()) + '/' + (Date.now() - toDate.getTime()),
      {
        headers: {
          "Authorization": localStorage.getItem('key')
        }
      })
      .subscribe((data: [{ millis: number, value: number }]) => {
        this.chartData = [{
          yAxisID: 'left-y-axis',
          label: 'temperature',
          data: []
        }];
        this.chartLabels = [];
        for (const reading of data) {
          const dateTime = new Date(reading.millis);
          this.chartLabels.push(dateTime.getHours() + ':' + dateTime.getMinutes());
          this.chartData[0].data.push(reading.value);
        }
      });

    this.http.get('http://api.smartroom.codeweb.nl:3031/get/list/connection/'
      + (Date.now() - fromDate.getTime()) + '/' + (Date.now() - toDate.getTime()),
      {
        headers: {
          "Authorization": localStorage.getItem('key')
        }
      })
      .subscribe((data: [{ millis: number, value: number }]) => {
        const newData = {
          backgroundColor: '#10Da10',
          yAxisID: 'right-y-axis',
          label: 'connection',
          data: []
        };

        // this.chartLabels = [];
        for (const reading of data) {
          const dateTime = new Date(reading.millis);
          // this.chartLabels.push(dateTime.getHours()+":"+dateTime.getMinutes());
          newData.data.push(reading.value * 100);
        }
        this.chartData.push(newData);
      });


    this.chartLabels = ['label 1', 'label2', 'label3', 'label3', 'label3', 'label3', 'label3'];
    this.chartData = [
      {data: [20, 20, 21, 21, 22, 20, 16], label: 'This week'},
    ];
  }

}

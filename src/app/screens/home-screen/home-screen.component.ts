import {Component, OnInit} from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  cols = 12;
  rowHeight = 500;
  rowspan = 1;

  constructor(private apiDataService: ApiDataService) {
  }

  ngOnInit(): void {


    this.setSizes();
  }

  onResize(event): void {
    this.setSizes();
  }

  setSizes(): void {
    if (window.innerWidth <= 500) {
      // this.cols = 1;
      // this.rowHeight = 500;
      // this.rowspan = 3;
    } else {
      // this.cols = 2;
      // this.rowHeight = 500;
      // this.rowspan = 1;
    }
  }

  public setCurrentTab(tab: string): void {
    this.apiDataService.setCurrentTab(tab);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  cols = 12;
  rowHeight = 500;
  rowspan = 1;

  constructor() {}

  ngOnInit(): void {


    this.setSizes();
  }

  onResize(event) {
    this.setSizes();
  }

  setSizes() {
    if(window.innerWidth <= 500) {
      // this.cols = 1;
      // this.rowHeight = 500;
      // this.rowspan = 3;
    } else {
      // this.cols = 2;
      // this.rowHeight = 500;
      // this.rowspan = 1;
    }
  }

}

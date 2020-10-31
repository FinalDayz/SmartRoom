import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  cols = 0;
  rowHeight = null;
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
      this.cols = 1;
      this.rowHeight = '7.5rem';
      this.rowspan = 3;
    } else {
      this.cols = 2;
      this.rowHeight = '2:1';
      this.rowspan = 1;
    }
  }

}

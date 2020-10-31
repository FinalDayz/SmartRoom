import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'SmartRoom';
  isLoggedIn = false;

  ngOnInit(): void {
    if (localStorage.getItem('key')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  successLogin() {
    this.isLoggedIn = true;
  }
}

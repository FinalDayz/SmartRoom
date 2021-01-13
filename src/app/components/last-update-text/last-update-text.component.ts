import {Component, OnInit} from '@angular/core';
import {ApiDataService} from "../../services/api-data.service";
import * as moment from 'moment';

@Component({
  selector: 'app-last-update-text',
  templateUrl: './last-update-text.component.html',
  styleUrls: ['./last-update-text.component.css']
})
export class LastUpdateTextComponent implements OnInit {

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {

  }

  getLastConnectionTime() {
    const dateTime = moment(
      this.apiDataService.getLastConnection(),
      "DD-MM-YYYY hh:mm:ss"
    );

    if(!dateTime.isValid()) {
      return "Not known";
    }

    return dateTime.format("ddd HH:mm:ss");
  }
}

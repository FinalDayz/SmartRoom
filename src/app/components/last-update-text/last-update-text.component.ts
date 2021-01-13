import { Component, OnInit } from '@angular/core';
import {ApiDataService} from "../../services/api-data.service";

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
    return "";
  }
}

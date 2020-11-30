import {Component, Input, OnInit} from '@angular/core';
import If, {ConditionType, InputType} from "../../../models/If";
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-if-block',
  templateUrl: './if-block.component.html',
  styleUrls: ['./if-block.component.scss']
})
export class IfBlockComponent implements OnInit {

  @Input() ifArr: Array<If>;
  @Input() depth: number;
  public inputTypes = Object.keys(InputType).filter(k => {return k.search("^[0-9]+$") == -1});
  public conditionTypes = Object.keys(ConditionType).filter(k => {return k.search("^[0-9]+$") == -1});

  constructor() { }

  ngOnInit(): void {
  }

  removeIf(ifArray: Array<If>, self: If) {
    ifArray.splice(ifArray.indexOf(self), 1);
  }

  addIf(ifCondition: If) {
    if(!ifCondition.and) {
      console.log("Make new");
      ifCondition.and = [];
    }
    ifCondition.and.push(new If());
    setTimeout(() => {
      M.AutoInit();
    }, 100);

  }

}

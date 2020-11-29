import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import Action, {ActionType} from "../../models/Action";
import Automation from "../../models/Automation";
import If, {ConditionType, InputType} from "../../models/If";

export enum Protocol {
  POST,
  GET,
  DELETE,
  OPTIONS,
}

@Component({
  selector: 'app-automation-list',
  templateUrl: './automation-list.component.html',
  styleUrls: ['./automation-list.component.css']
})
export class AutomationListComponent implements OnInit {

  public automations: Array<Automation> = [];
  public actionTypesData = ActionType;
  public actionTypes = Object.keys(ActionType);
  public inputTypes = Object.keys(InputType).filter(k => {return k.search("^[0-9]+$") == -1});
  public conditionTypes = Object.keys(ConditionType).filter(k => {return k.search("^[0-9]+$") == -1});

  constructor() { }

  ngOnInit(): void {

    const overHeatingNotification = new Automation();
    overHeatingNotification.name = "overheating notification";
    overHeatingNotification.ifs = [
      {
        input: InputType.temperature,
        condition: ConditionType[">"],
        value: 25,
      },{
        input: InputType.heater,
        condition: ConditionType["=="],
        value: 1,
      }
    ];

    overHeatingNotification.ifs.push(new If());

    overHeatingNotification.enabled = true;
    overHeatingNotification.action = new Action();
    overHeatingNotification.action.type = "notification";
    overHeatingNotification.action.data.title = "Overheating!";
    overHeatingNotification.action.data.content = "Temperature reached high, please take action!";

    const heaterOnNotification = new Automation();
    heaterOnNotification.name = "Heater on notification";
    heaterOnNotification.ifs = [
      {
        input: InputType.heater,
        condition: ConditionType["=="],
        value: 1,
      }
    ];

    heaterOnNotification.enabled = false;
    heaterOnNotification.action = new Action();
    heaterOnNotification.action.type = "notification";
    heaterOnNotification.action.data.title = "Heater on";
    heaterOnNotification.action.data.content = "The heater is turned on";

    this.automations.push(overHeatingNotification);
    this.automations.push(heaterOnNotification);
  };

  removeIf(ifArray: Array<If>, self: If) {
    console.log(ifArray.indexOf(self), 1);
    ifArray.splice(ifArray.indexOf(self), 1);
  }

  addIf(ifArray: Array<If>) {
    if(!ifArray) {
      ifArray = [];
    }
    ifArray.push(new If());
    setTimeout(() => {
      M.AutoInit();

    }, 100);
  }

  ngAfterViewChecked() {
    M.updateTextFields();
  }

  changeAction(automation: Automation, event) {
    automation.action.type = event.target.value;
    console.log(automation.action.type);
    console.log(this.actionTypesData[automation.action.type]);
  }

  ngAfterContentInit() {
    M.AutoInit();
    setTimeout(() => {
      M.AutoInit();

    }, 100);
  }


}

import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import Action, {ActionType, DefaultActionData} from "../../models/Action";
import Automation from "../../models/Automation";
import If, {ConditionType, InputType} from "../../models/If";
import {ApiDataService} from "../../services/api-data.service";
import {Observable} from "rxjs";

export enum Protocol {
  POST,
  GET,
  DELETE,
  OPTIONS,
}

@Component({
  selector: 'app-automation-list',
  templateUrl: './automation-list.component.html',
  styleUrls: ['./automation-list.component.scss']
})
export class AutomationListComponent implements OnInit {

  public automations: Array<Automation> = [];
  public actionTypesData = ActionType;
  public actionTypes = Object.keys(ActionType);
  lessThanValue: any;

  constructor(private data: ApiDataService) { }

  ngOnInit(): void {

    // const overHeatingNotification = new Automation();
    // overHeatingNotification.name = "overheating notification";
    // overHeatingNotification.ifs = [
    //   {
    //     input: InputType.temperature,
    //     condition: ConditionType[">"],
    //     value: 25,
    //     and: [
    //       {
    //         input: InputType.heater,
    //         condition: ConditionType["=="],
    //         value: 1,
    //       }
    //     ]
    //   },
    //   {
    //     input: InputType.temperature,
    //     condition: ConditionType[">"],
    //     value: 30,
    //   }
    //
    // ];
    //
    // overHeatingNotification.ifs.push(new If());
    //
    // overHeatingNotification.enabled = true;
    // overHeatingNotification.action = new Action();
    // overHeatingNotification.action.type = "notification";
    // overHeatingNotification.action.data.title = "Overheating!";
    // overHeatingNotification.action.data.content = "Temperature reached high, please take action!";
    //
    // const heaterOnNotification = new Automation();
    // heaterOnNotification.name = "Heater on notification";
    // heaterOnNotification.ifs = [
    //   {
    //     input: InputType.heater,
    //     condition: ConditionType["=="],
    //     value: 1,
    //   }
    // ];
    //
    // heaterOnNotification.enabled = false;
    // heaterOnNotification.action = new Action();
    // heaterOnNotification.action.type = "notification";
    // heaterOnNotification.action.data.title = "Heater on";
    // heaterOnNotification.action.data.content = "The heater is turned on";
    //
    // this.automations.push(overHeatingNotification);
    // this.automations.push(heaterOnNotification);
     this.data.automationPromise.then((automations: Array<Automation>) => {
       console.log("CALLBACK?!");
       this.automations = automations;
       console.log(automations);
     });
  };

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
    automation.action.data = DefaultActionData[automation.action.type];
  }

  ngAfterContentInit() {
    M.AutoInit();
   this.timeoutInit();
  }

  timeoutInit() {
    setTimeout(() => {
      M.AutoInit();

    }, 100);
  }

  addNew() {
    const newAutomation = new Automation();
    newAutomation.ifs = [];
    newAutomation.action = new Action();
    newAutomation.enabled = true;
    newAutomation.name = "New automation";
    this.automations.push(newAutomation);
    this.timeoutInit();
  }

  save(automation: Automation) {
    let event;
    if(automation.id) {
      event = this.data.modifyAutomation(automation);
    } else {
      event = this.data.addAutomation(automation);
    }
    this.handleRequest(event);
  }

  delete(automation: Automation) {
    let event = this.data.deleteAutomation(automation);
    this.automations.splice(this.automations.indexOf(automation), 1);
    this.handleRequest(event);
  }

  private handleRequest(event: Observable<Object>) {
    event.subscribe( res => {
      console.log(res);
    });
  }
}

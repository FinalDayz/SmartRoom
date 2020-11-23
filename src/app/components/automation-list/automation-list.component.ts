import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import Action, {ActionType} from "../../models/Action";
import Automation from "../../models/Automation";
import {ConditionType, InputType} from "../../models/If";

@Component({
  selector: 'app-automation-list',
  templateUrl: './automation-list.component.html',
  styleUrls: ['./automation-list.component.css']
})
export class AutomationListComponent implements OnInit {

  public automations: Array<Automation> = [];
  public actionTypes = Object.keys(ActionType);
  public inputTypes = Object.keys(InputType);
  public conditionTypes = Object.keys(ConditionType);

  constructor() { }

  ngOnInit(): void {
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.collapsible');
    //    M.Collapsible.init(elems, {
    //      inDuration: 300,
    //      outDuration: 300,
    //    });
    // });



    const notification = new Automation();
    notification.name = "overheating";
    notification.ifs = [
      {
        input: InputType.temperature,
        condition: ConditionType[">"],
        value: 25,
      }
    ];


    notification.enabled = true;
    notification.action = new Action();
    notification.action.type = "notification";
    notification.action.data.title = "Overheating!";
    notification.action.data.content = "Temperature reached high, please take action!";

    const humidNotification = new Automation();
    humidNotification.name = "Heater on notification";
    humidNotification.ifs = [
      {
        input: InputType.heater,
        condition: ConditionType["=="],
        value: 1,
      }
    ];

    humidNotification.enabled = false;
    humidNotification.action = new Action();
    humidNotification.action.type = "notification";
    humidNotification.action.data.title = "Heater on";
    humidNotification.action.data.content = "The heater is turned on";

    this.automations.push(humidNotification);
    this.automations.push(notification);

    console.log(this.automations);


    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('select');
    //   var instances = M.FormSelect.init(elems, {});
    // });

    // alert(2 );

    console.log(Object.keys(ConditionType));
    setTimeout(() => {


    }, 1000);

  };


  ngAfterContentInit() {
    M.AutoInit();
    setTimeout(() => {
      M.AutoInit();

    }, 100);
  }


}

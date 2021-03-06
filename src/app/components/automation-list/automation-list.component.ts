import {Component, OnInit} from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import Action, {ActionType, DefaultActionData} from "../../models/Action";
import Automation from "../../models/Automation";
import If from "../../models/If";
import {ApiDataService} from "../../services/api-data.service";
import {Observable} from "rxjs";

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
  private savedAutomation?: Automation = null;

  constructor(private data: ApiDataService) {
  }

  ngOnInit(): void {
    this.data.automationPromise.then((automations: Array<Automation>) => {
      this.automations = automations;
      this.timeoutInit();
      console.log(automations);
    });
  };

  addIf(ifArray: Array<If>) {
    if (!ifArray) {
      ifArray = [];
    }
    ifArray.push(new If());
    this.timeoutInit();
  }

  ngAfterViewChecked() {
    M.updateTextFields();
  }

  changeAction(automation: Automation, action: Action, event) {
    action.type = event.target.value;
    action.data = DefaultActionData[action.type];
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
    newAutomation.actions = [new Action()];
    newAutomation.enabled = true;
    newAutomation.name = "New automation";
    this.automations.push(newAutomation);
    this.timeoutInit();
  }

  add(automation: Automation) {
    this.data.addAutomation(automation)
      .subscribe(newAutomation => {
        automation.id = newAutomation.id;
        M.toast({
          html: 'Created automation \'' + automation.name + '\'',
        });
      });
  }

  delete(automation: Automation) {
    let event = this.data.deleteAutomation(automation);
    this.automations.splice(this.automations.indexOf(automation), 1);
    this.handleRequest(event)
      .then(() => {
        M.toast({
          html: 'Deleted automation \'' + automation.name + '\'',
        });
      });
  }

  private handleRequest(event: Observable<Object>) {
    return new Promise((acc, rej) => {
      event.subscribe(res => {
        this.ngOnInit();
        acc();
      });
    });
  }

  changeForm(automation: Automation) {
    if (automation.id) {

      this.handleRequest(
        this.data.modifyAutomation(automation)
      ).then(() => {
        this.savedAutomation = automation;
        M.toast({
          html: 'Saved automation',
          displayLength: 1000,
        });
        setTimeout(() => {
          this.savedAutomation = null;
        }, 200);
      });
    }
  }

  removeAction(automation: Automation, action: Action) {
    automation.actions.splice(automation.actions.indexOf(action), 1);
    this.changeForm(automation)
  }

  addAction(automation: Automation) {
    if(!automation.actions) {
      automation.actions = [];
    }
    automation.actions.push(new Action());
    this.timeoutInit();
  }
}

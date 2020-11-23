import Action from "./Action";
import If from "./If";

export default class Automation {
  name: string;
  enabled: boolean;
  ifs: Array<If>;
  action: Action
}

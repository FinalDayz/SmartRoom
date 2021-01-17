import Action from "./Action";
import If from "./If";

export default class Automation {
  id: number;
  name: string;
  enabled: boolean;
  ifs: Array<If>;
  action: Action
}

export enum InputType {
  "temperature", "heater", "pressure", "gas", "humidity"
}

export enum ConditionType {
  ">=", "<=", "==", "!=", "<", ">"
}

export default class If {
  input: InputType;
  condition: ConditionType;
  value: number|string;
  and?: Array<If> = [];
}

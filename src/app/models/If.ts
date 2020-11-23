export enum InputType {
  "temperature", "heater"
}

export enum ConditionType {
  ">=", "<=", "==", "!=", "<", ">"
}

export default class If {
  input: InputType;
  condition: ConditionType;
  value: number|string;
  and?: If;
}

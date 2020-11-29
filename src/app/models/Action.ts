export enum Type {
  string="string", boolean="boolean", number="number",
}

export const ActionType = {
  "heater": {
    isOn: Type.boolean
  },
  "notification": {
    title: Type.string,
    content: Type.string,
  }
};

export default class Action {
  type: "heater" | "notification";
  data: any = {};
}


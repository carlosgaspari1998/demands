import { ActionEnum } from "../../enums/actionEnum";

export interface Events {
  customerName: string;
  demandDescription: string;
  action: ActionEnum;
  date: Date;
  userName: string;

  //using only client
  actionName: string;
  }
import { Time } from "@angular/common";

export interface Demands {
  id: string;
  customer: string;
  address: string;
  description: string;
  creationDate: Date;
  demandTime: Time;
  finished: boolean;
  }
import { ILocation } from "../interfaces/location";
import { makeIdGenerator } from "./utils";

const getId = makeIdGenerator();

export const locationDef: ILocation[] = [
  {
    id: getId(),
    name: "Berlin",
  },
];

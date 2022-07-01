import { IEvent, IEventDef } from "./event";
export type IArtistImagesDef = string | string[];
export type IArtistEventDef = string | string[];

export interface IArtistDef {
  name: string;
  slug?: string;
  genre: string;
  events?: IArtistEventDef[];
  images?: IArtistImagesDef;
}

export interface IArtist {
  id: number;
  name: string;
  slug: string;
  genre: string;
  events: IEvent[];
  images: string[];
}

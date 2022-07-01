import { IArtist, IArtistDef } from "./artist";
import { ILocation } from "./location";
export type IEventImagesDef = string | string[];
export type IEventArtistDef = string | string[];

export interface IEventDef {
  slug?: string;
  name: string;
  date: string;
  location: ILocation;
  genre?: string;
  images?: IEventImagesDef;
  artists?: IEventArtistDef[];
}
export interface IEvent {
  id: number;
  slug: string;
  name: string;
  date: string;
  location: ILocation;
  genre: string;
  images: string[];
  artists: IArtist[];
}

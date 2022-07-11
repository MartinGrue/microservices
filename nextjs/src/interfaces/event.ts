import { type } from "os";
import { IArtist, IArtistDef } from "./artist";
import { ILocation } from "./location";
export type IEventImagesDef = string | string[];
export type IEventArtistDef = string | string[];
export type IEventLocation = string;
export interface IEventDef {
  slug?: string;
  name: string;
  date: string;
  location: IEventLocation;
  genre?: string;
  images?: IEventImagesDef;
  artists?: IEventArtistDef;
}
export interface IEvent {
  id: number;
  slug: string;
  name: string;
  date: string;
  location: ILocation | null;
  genre: string | null;
  images: string[];
  artists: IArtist[] | null;
}

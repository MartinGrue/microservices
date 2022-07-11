import {
  IArtist,
  IArtistDef,
  IArtistEventDef,
  IArtistImagesDef,
} from "../interfaces/artist";
import { IEvent, IEventDef } from "../interfaces/event";
import { eventsDef, makeEventImages, makeEventLocation } from "./events";
import { makeIdGenerator, nameToSlug } from "./utils";

const getId = makeIdGenerator();

export const artistsDef: IArtistDef[] = [
  {
    name: "Rihanna",
    slug: "rihanna",
    genre: "pop",
    images: "/images/artists/rihanna",
    events: ["event1"],
  },
];

export function makeArtistImages(def?: IArtistImagesDef): string[] {
  if (!def) {
    return [];
  }

  return typeof def === "string" ? [def] : def.slice();
}

const makeEvents = (defs?: IArtistEventDef) => {
  if (!defs) {
    return [];
  }
  const eventSlugs = typeof defs === "string" ? [defs] : defs;
  return eventSlugs
    .map((slug) => {
      const eventDef = eventsDef.find((x) => x.slug === slug);

      if (!eventDef) {
        return null;
      }

      return {
        id: getId(),
        slug: eventDef.slug || nameToSlug(eventDef.name),
        name: eventDef.name,
        date: eventDef.date,
        genre: eventDef.genre || null,
        images: makeEventImages(eventDef.images),
        location: makeEventLocation(eventDef.location),
        artists: null,
      };
    })
    .filter((x) => x !== null) as IEvent[];
};
const artistsData: IArtist[] = artistsDef.map((artistdef) => ({
  id: getId(),
  name: artistdef.name,
  slug: artistdef.slug || nameToSlug(artistdef.name),
  genre: artistdef.genre,
  events: makeEvents(artistdef.events),
  images: makeArtistImages(artistdef.images),
}));

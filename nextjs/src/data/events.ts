import { IArtist } from "../interfaces/artist";
import {
  IEvent,
  IEventArtistDef,
  IEventDef,
  IEventImagesDef,
  IEventLocation,
} from "../interfaces/event";
import { ILocation } from "../interfaces/location";
import { artistsDef, makeArtistImages } from "./artists";
import { locationDef } from "./locations";
import { makeIdGenerator, nameToSlug } from "./utils";

const getId = makeIdGenerator();

export const eventsDef: IEventDef[] = [
  {
    name: "Event1",
    slug: "event1",
    date: "1",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657533032/tickets/sido_cfoaoy.webp",
    artists: ["sido"],
  },
  {
    name: "Event2",
    slug: "event2",
    date: "2",
    location: "Berlin",
    genre: "rock",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532625/tickets/coldplay_vqzx8k.webp",
    artists: ["coldplay"],
  },
  {
    name: "Event3",
    slug: "event3",
    date: "3",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532623/tickets/harry_ibrlzz.webp",
    artists: ["harrystyles"],
  },
  {
    name: "Event4",
    slug: "event4",
    date: "4",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532622/tickets/lilnasx_fajbxb.webp",
    artists: ["lilnasx"],
  },
  {
    name: "Event5",
    slug: "event5",
    date: "5",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532621/tickets/seeed_rutfnw.webp",
    artists: ["seeed"],
  },
  {
    name: "Event6",
    slug: "event6",
    date: "6",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532621/tickets/deichkind_lvuwdc.webp",
    artists: ["deichkind"],
  },
  {
    name: "Event7",
    slug: "event7",
    date: "7",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532619/tickets/ozzyosbourne_gn409f.webp",
    artists: ["ozzyosbourne"],
  },
  {
    name: "Event8",
    slug: "event8",
    date: "8",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532618/tickets/trailerpark_vytd6h.webp",
    artists: ["trailerpark"],
  },
  {
    name: "Event9",
    slug: "event9",
    date: "9",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532617/tickets/boniver_p9qk7n.webp",
    artists: ["boniver"],
  },
  {
    name: "Event10",
    slug: "event10",
    date: "10",
    location: "Berlin",
    genre: "pop",
    images: "https://res.cloudinary.com/dvzlb9xco/image/upload/v1657532616/tickets/bethheart_surkhq.webp",
    artists: ["bethheart"],
  },
];
export function makeEventImages(def?: IEventImagesDef): string[] {
  if (!def) {
    return [];
  }

  return typeof def === "string" ? [def] : def.slice();
}
export function makeEventLocation(def?: IEventLocation): ILocation | null {
  if (!def) {
    return null;
  }
  return locationDef.find((x) => x.name === def) || null;
}
function makeArtists(defs?: IEventArtistDef): IArtist[] {
  if (!defs) {
    return [];
  }
  const artistSlugs = typeof defs === "string" ? [defs] : defs;

  return artistSlugs
    .map((slug) => {
      const artistDef = artistsDef.find((x) => x.slug === slug);

      if (!artistDef) {
        return null;
      }

      return {
        id: getId(),
        slug: artistDef.slug || nameToSlug(artistDef.name),
        name: artistDef.name,
        genre: artistDef.genre || null,
        images: makeArtistImages(artistDef.images),
        events: null,
      };
    })
    .filter((x) => x !== null) as IArtist[];
}
const eventsData: IEvent[] = eventsDef.map((eventDef) => ({
  id: getId(),
  slug: eventDef.slug || nameToSlug(eventDef.name),
  name: eventDef.name,
  date: eventDef.date,
  genre: eventDef.genre || null,
  images: makeEventImages(eventDef.images),
  location: makeEventLocation(eventDef.location),
  artists: makeArtists(eventDef.artists),
}));

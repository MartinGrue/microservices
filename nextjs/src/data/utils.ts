export const makeIdGenerator = (): (() => number) => {
  let lastId = 0;

  return () => {
    lastId += 1;

    return lastId;
  };
};
export function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
}

/**
 * Utilities for objects
 */

export function filter(
  object,
  filter: (value: any, key: string, object: object) => boolean
) {
  return Object.keys(object)
    .filter(key => filter(object[key], key, object))
    .reduce((obj, key) => ({ ...obj, [key]: object[key] }), {});
}

export async function asyncArrayFilter<T>(
  arr: T[],
  callback: (item: T, index: number, arr: T[]) => boolean | Promise<boolean>
) {
  return (await Promise.all(
    arr.map(async (item, index) => {
      return (await callback(item, index, arr)) ? item : undefined;
    })
  )).filter(i => i !== undefined);
}

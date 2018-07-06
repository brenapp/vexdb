/**
 * Contains logic on applying various filters to arrays of objects (used for client side filtering)
 */

type FilterFunction = (val: any, object: object) => Promise<boolean> | boolean;
type Filter = RegExp | string[] | number[] | FilterFunction | number | string;

export default async function filter(
  object: object,
  key: string,
  filt: Filter
) {
  let value = object[key];

  if (filt instanceof RegExp) {
    return (filt as RegExp).test(value);
  } else if (filt instanceof Array) {
    return (filt as (string | number)[]).includes(value);
  } else if (filt instanceof Function) {
    return filt(value, object);
  } else {
    return value === filt;
  }
}

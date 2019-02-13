declare type FilterFunction = (val: any, object: object) => Promise<boolean> | boolean;
declare type Filter = RegExp | string[] | number[] | FilterFunction | number | string;
export default function filter(object: object, key: string, filt: Filter): Promise<boolean>;
export {};

export declare function filter(object: any, filter: (value: any, key: string, object: object) => boolean): {};
export declare function asyncArrayFilter<T>(arr: T[], callback: (item: T, index: number, arr: T[]) => boolean | Promise<boolean>): Promise<T[]>;

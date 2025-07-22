import { isPlainObject } from "./guards/isPlainObject";

export function merge<T extends object, U extends object>(
    existing: T,
    incoming: U
): T & U {
    const result: any = {};
    const keys = new Set([...(Object.keys(existing) as (keyof T)[]), ...(Object.keys(incoming) as (keyof U)[])]);

    for (const key of keys) {
        const existingValue = existing[key as keyof T];
        const incomingValue = incoming[key as keyof U];

        if (Array.isArray(incomingValue) && Array.isArray(existingValue)) {
            result[key] = [...existingValue, ...incomingValue];
        } else if (isPlainObject(existingValue) && isPlainObject(incomingValue)) {
            result[key] = merge(existingValue, incomingValue);
        } else {
            result[key] = incomingValue ?? existingValue;
        }
    }

    return result;
}
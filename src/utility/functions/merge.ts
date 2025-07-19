import { isPlainObject } from "./guards/isPlainObject";

export function merge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
    existing: Partial<T>,
    incoming: Partial<U>
): T & U {
    const result: any = {};
    const keys = new Set([...Object.keys(existing), ...Object.keys(incoming)]);

    for (const key of keys) {
        const existingValue = existing[key];
        const incomingValue = incoming[key];

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
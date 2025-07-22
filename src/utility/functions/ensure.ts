import { Nullable } from "../../types/utility";

export function ensure<T>(value: Nullable<T>, errorFactory: () => Error) {
    if (value === null || value === undefined) {
        throw errorFactory();
    }

    return value;
}
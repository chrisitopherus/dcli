import { DeepPartial } from "../../types/utility";
import { merge } from "./merge";

export function patch<T extends object>(
    existing: T,
    incoming: DeepPartial<T>
) {
    return merge(existing, incoming);
}
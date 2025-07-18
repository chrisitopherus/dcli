import { PredicateFunc } from "../../types/utility";

export function onlyIf<T>(value: T | undefined, predicate: PredicateFunc<T>): T | undefined {
    return value !== undefined && predicate(value) ? value : undefined;
}
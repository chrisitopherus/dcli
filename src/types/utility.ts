import { PropertyName } from "utility-pickle";
export type TypeConstructor<T> = (value: string) => T;
export type TypedPropertyDecorator<T> = <K extends PropertyName, O extends Record<K, T>>(
    target: O,
    propertyKey: K
) => void;
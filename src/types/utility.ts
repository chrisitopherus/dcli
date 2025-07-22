import { MetadataKey } from '../utility/metadata';
import { CommandMetadata } from "./decorators/command";
import { OptionMetadata } from "./decorators/options";

export type PropertyKey = string | symbol;
export type Maybe<T> = T | undefined;
export type PredicateFunc<T> = (value: T) => boolean;
export type TypeConstructor<T> = (value: string) => T;
export type TypedPropertyDecorator<T> = <K extends PropertyKey, O extends Record<K, T> & object>(
    target: O,
    propertyKey: K
) => void;

export type MetadataTypeMap = {
    [MetadataKey.Command]: CommandMetadata;
    [MetadataKey.Option]: OptionMetadata;
}

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
    ? T[P] extends Function
    ? T[P]
    : DeepPartial<T[P]>
    : T[P];
};
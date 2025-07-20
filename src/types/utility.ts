import { MetadataKey } from '../utility/metadata';
import { CommandMetadata } from "./decorators/command";
import { OptionMetadata } from "./decorators/options";

export type PropertyKey = string | symbol;
export type Maybe<T> = T | undefined;
export type PredicateFunc<T> = (value: T) => boolean;
export type TypeConstructor<T> = (value: string) => T;
export type TypedPropertyDecorator<T> = <K extends PropertyKey, O extends Record<K, T>>(
    target: O,
    propertyKey: K
) => void;

export type MetadataTypeMap = {
    [MetadataKey.Command]: CommandMetadata;
    [MetadataKey.Option]: OptionMetadata;
}
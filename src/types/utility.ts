import { PropertyName } from "utility-pickle";
import { MetadataKey } from '../utility/metadata';
import { CommandMetadata } from "./decorators/command";
import { OptionMetadata } from "./decorators/options";
export type TypeConstructor<T> = (value: string) => T;
export type TypedPropertyDecorator<T> = <K extends PropertyName, O extends Record<K, T>>(
    target: O,
    propertyKey: K
) => void;

export type MetadataTypeMap = {
    [MetadataKey.Command]: CommandMetadata;
    [MetadataKey.Option]: OptionMetadata;
}
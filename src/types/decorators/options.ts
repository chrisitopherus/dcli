import { OptionKind } from "../../utility/options/kind";
import { TypeConstructor } from "../utility";

export interface OptionInformation<T> {
    name: string;
    description: string;
    type: TypeConstructor<T>;
    required?: boolean;
    allowedValues?: unknown[];
    aliases?: string[];
}

export interface PositionalInformation<T> {
    name: string;
    description: string;
    position: number;
    type: TypeConstructor<T>;
    required?: boolean;
    allowedValues?: unknown[];
}

export interface FlagInformation {
    name: string;
    description: string;
    aliases?: string[];
}

export interface VariadicInformation<T> {
    name: string;
    description: string;
    type: TypeConstructor<T>;
    required?: boolean;
    allowedValues?: unknown[];
}

export interface OptionMetadata {
    name?: string;
    description?: string;
    position?: number;
    type?: TypeConstructor<unknown>;
    required?: boolean;
    aliases?: string[];
    kind?: OptionKind;
    allowedValues?: unknown[];
}
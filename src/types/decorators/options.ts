import { OptionKind } from "../../utility/options/optionKind";
import { TypeConstructor } from "../utility";

export interface OptionInformation<T> {
    name: string;
    description: string;
    type: TypeConstructor<T>;
    required?: boolean;
    allowedValues?: unknown[];
    aliases?: string[];
    default?: boolean;
}

export interface OptionMetadata {
    name: string;
    description: string;
    type: TypeConstructor<unknown>;
    required: boolean;
    aliases: string[];
    default: boolean;
    kind: OptionKind;
    allowedValues?: unknown[];
}
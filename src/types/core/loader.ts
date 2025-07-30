import { CLICommand } from "../../core/commands/command";
import { OptionKind } from "../../utility/options/kind";
import { PropertyKey, TypeConstructor } from "../utility";

export interface LoadedCommandOptions {
    positional: LoadedPositionalOption[];
    named: LoadedOption[];
}

export interface LoadedCommand {
    name: string;
    description: string;
    aliases: string[];
    default: boolean;
    hidden: boolean;
    commandInstance: CLICommand;
    options: LoadedCommandOptions;
    subcommands: LoadedCommand[];
}

export interface LoadedOption {
    name: string;
    propertyKey: PropertyKey;
    description: string;
    required: boolean;
    aliases: string[];
    type: TypeConstructor<unknown>;
    kind: OptionKind;
    allowedValues?: unknown[];
}

export interface LoadedPositionalOption extends LoadedOption {
    position: number;
}
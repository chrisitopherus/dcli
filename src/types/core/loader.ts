import { CLICommand } from "../../core/commands/command";
import { OptionKind } from "../../utility/options/kind";
import { TypeConstructor } from "../utility";

export interface LoadedCommand {
    name: string;
    description: string;
    aliases: string[];
    default: boolean;
    hidden: boolean;
    commandInstance: CLICommand;
    options: LoadedOption[];
    subcommands: LoadedCommand[];
}

export interface LoadedOption {
    name: string;
    propertyName: PropertyKey;
    description: string;
    required: boolean;
    aliases: string[];
    type: TypeConstructor<unknown>;
    kind: OptionKind;
    allowedValues?: unknown[];
}
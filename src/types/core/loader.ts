import { CLICommand } from "../../core/commands/command";
import { OptionKind } from "../../utility/options/kind";
import { TypeConstructor } from "../utility";

export interface LoadedCommand {
    name: string;
    subcommands?: LoadedCommand[];
    description: string;
    aliases: string[];
    default: boolean;
    hidden: boolean;
    commandInstance: CLICommand;
    options: LoadedOption[];
}

export interface LoadedOption {
    name: string;
    description: string;
    required: boolean;
    aliases: string[];
    type: TypeConstructor<unknown>;
    default: boolean;
    kind: OptionKind;
    allowedValues?: unknown[];
}
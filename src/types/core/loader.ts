import { Command } from "../../core/commands/command";
import { OptionKind } from "../../utility/options/optionKind";
import { TypeConstructor } from "../utility";

export interface LoadedCommand {
    name: string;
    subcommand?: string;
    description: string;
    aliases: string[];
    default: boolean;
    hidden: boolean;
    commandInstance: Command;
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
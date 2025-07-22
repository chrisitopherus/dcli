import { CommandClass } from "../core/command";

export interface CommandInformation {
    name: string;
    description: string;
    subcommands?: CommandClass[];
    aliases?: string[];
    default?: boolean;
    hidden?: boolean;
}

export interface CommandMetadata {
    name?: string;
    description?: string;
    subcommands?: CommandClass[];
    aliases?: string[];
    default?: boolean;
    hidden?: boolean;
}
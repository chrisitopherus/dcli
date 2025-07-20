import { CLICommand } from "../../core/commands/command";

export type CommandClass = new (...args: any[]) => CLICommand;
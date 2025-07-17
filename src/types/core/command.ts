import { Command } from "../../core/commands/command";

export type CommandClass = new (...args: any[]) => Command;
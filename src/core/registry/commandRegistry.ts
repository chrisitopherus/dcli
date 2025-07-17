import { LoadedCommand } from "../../types/core/loader";

export class CommandRegistry {
    private commands: LoadedCommand[] = [];

    public register(command: LoadedCommand) {
        this.commands.push(command);
    }

    public getCommand(name: string): LoadedCommand | undefined {
        return this.commands.find(cmd => cmd.name === name || cmd.aliases.includes(name));
    }
}
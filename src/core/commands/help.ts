import { Command } from "../../decorators/commands/command";
import { CLICommand } from "./command";

@Command({
    name: "help",
    description: "Displays available commands and usage information",
    aliases: ["h"]
})
export class HelpCommand extends CLICommand {
    public constructor() {
        super();
    }

    public override run(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}
import { Command } from "../../decorators/commands/command";
import { CLICommand } from "./command";

@Command({
    name: "version",
    description: "Displays the current CLI version",
    aliases: ["v"]
})
export class VersionCommand extends CLICommand {
    public constructor() {
        super();
    }

    public override run(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}
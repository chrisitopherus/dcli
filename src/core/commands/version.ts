import { Command } from "../../decorators/commands/command";
import { CLICommand } from "./command";

@Command({
    name: "version",
    description: "Displays the current CLI version",
    aliases: ["v"]
})
export class VersionCommand extends CLICommand {
    private readonly version: string;
    public constructor(version: string = "1.0.0") {
        super();
        this.version = version;
    }

    public override run(): void | Promise<void> {
        console.log(this.version);
    }
}
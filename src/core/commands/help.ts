import { Command } from "./command";

export class HelpCommand extends Command {
    public constructor() {
        super();
    }

    public override run(): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}
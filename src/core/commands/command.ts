export abstract class CLICommand {
    abstract run(): void | Promise<void>;
}
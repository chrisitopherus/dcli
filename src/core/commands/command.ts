export abstract class Command {
    abstract run(): void | Promise<void>;
}
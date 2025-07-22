import { ParsedCommand } from "../../types/core/parser";

export class ParserContext {
    private index = 0;
    private args: string[];

    public command: ParsedCommand = {
        name: "",
        options: []
    }

    public constructor(args: string[]) {
        this.args = args;
    }

    public get currentIndex(): number{
        return this.index;
    }

    public next() {
        return this.index++;
    }

    public currentToken(): string | undefined {
        return this.args[this.index];
    }

    public hasMore(): boolean {
        return this.index < this.args.length;
    }
}
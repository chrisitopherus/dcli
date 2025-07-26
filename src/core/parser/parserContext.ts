import { LoadedCommand, LoadedOption } from "../../types/core/loader";
import { ParsedCommand, ParsedOption, ParserTrace } from "../../types/core/parser";
import { Maybe } from "../../types/utility";
import { ParserState } from "./parserState";

export class ParserContext {
    private index = 0;
    private args: string[];
    private readonly state = new ParserState();

    private trace: ParserTrace = {
        parsedToken: []
    }

    public constructor(args: string[]) {
        this.args = args;
    }

    public setCommand(command: LoadedCommand) {
        this.state.resetForNewCommand(command);
    }

    public getParsedCommand(): Maybe<ParsedCommand> {
        if (!this.state.commandInstance) return;
        return {
            commandInstance: this.state.commandInstance,
            options: this.state.options
        }
    }

    public addParsedOption(option: ParsedOption) {
        this.state.addOption(option);
    }

    public findOption(optionName: string): Maybe<LoadedOption> {
        return this.state.availableOptions.find((option) => option.name === optionName || (optionName && option.aliases.includes(optionName)));
    }

    public getPositionalIndex() {
        return this.state.positionalIndex;
    }

    public incrementPositionalIndex() {
        this.state.positionalIndex++;
    }

    public get currentIndex(): number {
        return this.index;
    }

    public next() {
        return ++this.index;
    }

    public forward(amount: number) {
        this.index += amount;
    }

    public consume(): Maybe<string> {
        return this.args[this.index++];
    }

    public hasMore(): boolean {
        return this.index < this.args.length;
    }

    public getAllRemainingToken() {
        return this.args.slice(this.index);
    }
}
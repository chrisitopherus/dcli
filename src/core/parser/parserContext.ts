import { LoadedCommand, LoadedOption, LoadedPositionalOption } from "../../types/core/loader";
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
        this.trace;
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

    public findNamedOption(optionName: string): Maybe<LoadedOption> {
        return this.state.availableOptions.named.find((option) => option.name === optionName || (optionName && option.aliases.includes(optionName)));
    }

    public findPositionalOption(index: number): Maybe<LoadedPositionalOption> {
        return this.state.availableOptions.positional.find(option => option.position === index);
    }

    public getPositionalIndex(): number {
        return this.state.positionalIndex;
    }

    public getCurrentIndex(): number {
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

    public consumePositionalOption(): Maybe<LoadedPositionalOption> {
        const token = this.peek();
        if (!token) return;

        const option = this.findPositionalOption(this.state.positionalIndex);
        if (!option) return;

        this.consume();
        this.state.positionalIndex++;
        return option;
    }

    public consumeNamedOption(): Maybe<LoadedOption> {
        const token = this.peek();
        if (!token) return;

        const option = this.findNamedOption(token);
        if (!option) return;

        this.consume();
        return option;
    }

    public peek(): Maybe<string> {
        return this.args[this.index];
    }

    public hasMore(): boolean {
        return this.index < this.args.length;
    }

    public getAllRemainingToken() {
        return this.args.slice(this.index);
    }
}
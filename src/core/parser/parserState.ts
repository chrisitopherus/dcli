import { LoadedCommand, LoadedCommandOptions } from "../../types/core/loader";
import { ParsedOption } from "../../types/core/parser";
import { Maybe } from "../../types/utility";
import { CLICommand } from "../commands/command";

export class ParserState {

    private _availableOptions?: Maybe<LoadedCommandOptions>;
    public commandInstance?: Maybe<CLICommand>;
    public options: ParsedOption[] = [];
    public positionalIndex = 0;
    public constructor() { }

    public reset() {
        this._availableOptions = undefined;
        this.commandInstance = undefined;
        this.options = [];
        this.positionalIndex = 0;
    }

    public resetForNewCommand(command: LoadedCommand) {
        this._availableOptions = command.options;
        this.commandInstance = command.commandInstance;
        this.options = [];
        this.positionalIndex = 0;
    }

    public addOption(option: ParsedOption) {
        this.options.push(option);
    }

    public get availableOptions() {
        return this._availableOptions ?? { named: [], positional: [] };
    }
}
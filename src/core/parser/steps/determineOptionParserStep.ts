import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { ParserContext } from "../parserContext";
import { OptionParserStepFactory } from '../optionParserStepFactory';
import { LoadedOption } from "../../../types/core/loader";
import { Maybe } from "../../../types/utility";

export class DetermineOptionParserStep implements ParserStep {
    private readonly optionStepFactory = new OptionParserStepFactory();
    public constructor() { }

    public handle(context: ParserContext): ParserStepResult {
        const command = context.getParsedCommand();
        if (!command) throw new Error("No Command, No parsing.");

        const token = context.peek();
        const foundOption = token ? context.findNamedOption(token) : undefined;

        return {
            success: true,
            next: this.getOptionStep(foundOption, context)
        };
    }

    private getOptionStep(option: Maybe<LoadedOption>, context: ParserContext) {
        if (!option) {
            option = context.findPositionalOption(context.getPositionalIndex());
        }

        if (!option) return;

        // TODO: prefer variadic when optional positionals are encountered
        /*
            For each positional option:
            Check if the current option is optional.
            Look ahead to see if there are:
            Enough arguments left to still satisfy all required positionals after it, or
            Any arguments reserved for a variadic positional later.
            If not enough args remain, skip this optional (set it undefined) and let variadic absorb the rest.
        */

        return this.optionStepFactory.create(option.kind);
    }
}
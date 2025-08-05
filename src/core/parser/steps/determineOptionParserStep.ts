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
        
        return this.optionStepFactory.create(option.kind);
    }
}
import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { OptionKind } from "../../../utility/options/kind";
import { ParserContext } from "../parserContext";
import { FlagParserStep } from "./flagParserStep";
import { OptionParserStep } from "./optionParserStep";
import { PositionalParserStep } from "./positionalParserStep";

export class DetermineOptionParserStep implements ParserStep {
    public constructor() { }

    public handle(context: ParserContext): ParserStepResult {
        const command = context.getParsedCommand();
        if (!command) throw new Error("No Command, No parsing.");
        const token = context.consume();

        const foundOption = token ? context.findOption(token) : undefined;

        if (!foundOption) return {
            success: true,
            next: new PositionalParserStep()
        }

        return {
            success: true,
            next: foundOption.kind === OptionKind.OPTION ? new OptionParserStep(foundOption) : new FlagParserStep()
        };
    }
}
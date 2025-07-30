import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { OptionKind } from "../../../utility/options/kind";
import { CLIError } from "../../cliError";
import { ParserContext } from "../parserContext";
import { DetermineOptionParserStep } from "./determineOptionParserStep";

export class PositionalParserStep implements ParserStep {
    public constructor() {
    }

    public handle(context: ParserContext): ParserStepResult {
        const token = context.peek();
        if (!token) return {
            success: false,
            error: CLIError.factory.invalidCommand("no token, positional", "parser")
        }

        const option = context.consumePositionalOption();
        if (!option) return {
            success: false,
            error: CLIError.factory.invalidCommand("no option at index, positional", "parser")
        }

        context.addParsedOption({
            position: option.position,
            value: option.type(token),
            kind: OptionKind.POSITIONAL,
            raw: token,
            propertyKey: option.propertyKey
        });

        return {
            success: true,
            next: new DetermineOptionParserStep()
        }
    }

}
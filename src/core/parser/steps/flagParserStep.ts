import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { OptionKind } from "../../../utility/options/kind";
import { CLIError } from "../../cliError";
import { ParserContext } from "../parserContext";
import { DetermineOptionParserStep } from "./determineOptionParserStep";

export class FlagParserStep implements ParserStep {
    public constructor() {
    }

    public handle(context: ParserContext): ParserStepResult {
        const token = context.peek();
        if (!token) return {
            success: false,
            error: CLIError.factory.invalidCommand("no token, flag", "parser")
        }

        const option = context.consumeNamedOption();
        if (!option) return {
            success: false,
            // TODO: create right error
            error: CLIError.factory.invalidCommand("No valid option token.")
        }

        context.addParsedOption({
            kind: OptionKind.FLAG,
            name: option.name,
            raw: token,
            propertyKey: option.propertyKey
        });

        return {
            success: true,
            next: new DetermineOptionParserStep()
        }
    }

}
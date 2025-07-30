import { LoadedOption } from "../../../types/core/loader";
import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { OptionKind } from "../../../utility/options/kind";
import { CLIError } from "../../cliError";
import { ParserContext } from "../parserContext";
import { DetermineOptionParserStep } from "./determineOptionParserStep";

export class OptionParserStep implements ParserStep {
    public constructor() {
    }

    public handle(context: ParserContext): ParserStepResult {
        const option = context.consumeNamedOption();
        if (!option) return {
            success: false,
            // TODO: create right error
            error: CLIError.factory.invalidCommand("No valid option token.")
        }

        const valueToken = context.consume();
        if (!valueToken) return {
            success: false,
            // TODO: create right error
            error: CLIError.factory.invalidCommand("No value token.")
        }

        const value = option.type(valueToken) as string;
        context.addParsedOption({
            name: option.name,
            kind: OptionKind.OPTION,
            value,
            raw: valueToken,
            propertyKey: option.propertyKey
        })

        return {
            success: true,
            next: new DetermineOptionParserStep()
        };
    }

}
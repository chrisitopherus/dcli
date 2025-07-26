import { LoadedOption } from "../../../types/core/loader";
import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { OptionKind } from "../../../utility/options/kind";
import { CLIError } from "../../cliError";
import { ParserContext } from "../parserContext";
import { DetermineOptionParserStep } from "./determineOptionParserStep";

export class OptionParserStep implements ParserStep {
    private readonly optionInformation: LoadedOption;
    public constructor(optionInformation: LoadedOption) {
        this.optionInformation = optionInformation;
    }

    public handle(context: ParserContext): ParserStepResult {
        const token = context.consume();
        if (!token) return {
            success: false,
            // TODO: create right error
            error: CLIError.factory.invalidCommand("No value.")
        }

        const value = this.optionInformation.type(token) as string;
        context.addParsedOption({
            name: this.optionInformation.name,
            kind: OptionKind.OPTION,
            value,
            raw: token
        })

        return {
            success: true,
            next: new DetermineOptionParserStep()
        };
    }

}
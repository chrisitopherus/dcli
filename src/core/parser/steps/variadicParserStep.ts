import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { OptionKind } from "../../../utility/options/kind";
import { CLIError } from "../../cliError";
import { ParserContext } from "../parserContext";

export class VariadicParserStep implements ParserStep {
    public constructor() { }

    public handle(context: ParserContext): ParserStepResult {
        const option = context.findPositionalOption(context.getPositionalIndex());
        if (!option) return {
            success: false,
            error: CLIError.factory.invalidCommand("no option, variadic", "parser")
        }

        const values: string[] = [];
        while (context.hasMore()) {
            const token = context.consume()!;
            values.push(token);
        }

        context.addParsedOption({
            kind: OptionKind.VARIADIC,
            position: option.position,
            raw: values.join(" "),
            value: values.map(option.type),
            propertyKey: option.propertyKey
        });

        return {
            success: true,
            next: undefined
        }
    }

}
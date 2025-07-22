import { ParserStep } from "../../types/core/parser";
import { Maybe } from "../../types/utility";
import { ParserContext } from "./parserContext";
import { CommandParserStep } from "./steps/commandParserStep";

export class CLIParser {
    // TODO: supportedCommands should be the loaded commands.
    public constructor(supportedCommands: any[]) {

    }

    public parse(args: string[]) {
        const context = new ParserContext(args);
        let step: Maybe<ParserStep> = undefined;
        while (context.hasMore()) {
            if (!step) {
                step = this.determineNextStep(context);
            }

            step = step.handle(context);
        }

        // finished parsing

        return context.command;
    }

    private determineNextStep(context: ParserContext): ParserStep {
        return new CommandParserStep();
    }
}
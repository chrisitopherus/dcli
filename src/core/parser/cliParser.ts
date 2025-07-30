import { ParserStep } from "../../types/core/parser";
import { Maybe } from "../../types/utility";
import { ParserContext } from "./parserContext";
import { CommandParserStep } from "./steps/commandParserStep";
import { CommandRegistry } from '../registry/commandRegistry';

export class CLIParser {
    private readonly commandRegistry: CommandRegistry;
    public constructor(commandRegistry: CommandRegistry) {
        this.commandRegistry = commandRegistry;
    }

    public parse(args: string[]) {
        const context = new ParserContext(args);
        let step: Maybe<ParserStep> = new CommandParserStep(this.commandRegistry);
        while (context.hasMore()) {
            if (!step) {
                break;
            }

            const result = step.handle(context);

            if (!result.success) {
                // error
                throw result.error;
            }

            step = result.next;
        }

        // finished parsing

        return context.getParsedCommand();
    }
}
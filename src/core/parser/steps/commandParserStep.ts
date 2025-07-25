import { LoadedCommand } from "../../../types/core/loader";
import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { Maybe } from "../../../types/utility";
import { ErrorCode } from "../../../utility/errorCode";
import { CLIError } from "../../cliError";
import { CommandRegistry } from "../../registry/commandRegistry";
import { ParserContext } from '../parserContext';
import { DetermineOptionParserStep } from "./determineOptionParserStep";

export class CommandParserStep implements ParserStep {
    private readonly registry: CommandRegistry;
    public constructor(commandRegistry: CommandRegistry) {
        this.registry = commandRegistry;
    }

    public handle(context: ParserContext): ParserStepResult {
        const command = this.getCommand(context);
        if (!command) return {
            success: false,
            error: new CLIError("", ErrorCode.PARSER_UNKNOWN_FLAG, "parser")
        }

        context.progress.commandInformation = command;

        context.progress.command = {
            commandInstance: command.commandInstance,
            options: []
        }

        return {
            success: true,
            next: new DetermineOptionParserStep()
        }
    }

    private getCommand(context: ParserContext): Maybe<LoadedCommand> {
        const tokens = context.getAllRemainingToken();
        const result = this.registry.findCommand(tokens);
        context.forward(result.matchedCount);
        return result.command;
    }

}
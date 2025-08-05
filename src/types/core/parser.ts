import { CLIError } from "../../core/cliError";
import { CLICommand } from "../../core/commands/command";
import { ParserContext } from "../../core/parser/parserContext";
import { OptionKind } from "../../utility/options/kind";
import { Maybe, PropertyKey } from '../utility';

export interface ParsedCommand {
    commandInstance?: CLICommand;
    options: ParsedOption[];
}

export interface ParsedBaseInformation {
    raw: string;
    propertyKey: PropertyKey;
}

export interface ParsedFlag extends ParsedBaseInformation {
    name: string;
    kind: OptionKind.FLAG
}

export interface ParsedValueOption extends ParsedBaseInformation {
    name: string;
    value: unknown;
    kind: OptionKind.OPTION;
}

export interface ParsedPositional extends ParsedBaseInformation {
    position: number;
    value: unknown;
    kind: OptionKind.POSITIONAL;
}

export interface ParsedVariadicArgument extends ParsedBaseInformation {
    position: number;
    value: unknown[];
    kind: OptionKind.VARIADIC;
}

export type ParsedOption = ParsedFlag | ParsedValueOption | ParsedPositional | ParsedVariadicArgument;

export interface ParserStepSuccess {
    success: true;
    next?: ParserStep;
}

export interface ParserStepFailure {
    success: false;
    error: CLIError;
}

export type ParserStepResult = ParserStepSuccess | ParserStepFailure;

export interface ParserStep {
    handle(context: ParserContext): ParserStepResult;
}

export interface ParserTrace {
    parsedToken: string[];
}
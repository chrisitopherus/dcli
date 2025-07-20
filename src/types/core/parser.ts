import { ParserContext } from "../../core/parser/parserContext";
import { OptionKind } from "../../utility/options/optionKind";
import { Maybe } from "../utility";

export interface ParsedCommand {
    name: string;
    subCommandName?: string;
    options: ParsedOption[];
    args: ParsedArgument[];
}

export interface ParsedBaseInformation {
    raw: string;
}

export interface ParsedFlag extends ParsedBaseInformation {
    name: string;
    kind: OptionKind.FLAG
}

export interface ParsedValueOption extends ParsedBaseInformation {
    name: string;
    value: string;
    kind: OptionKind.OPTION;
}

export interface ParsedArg extends ParsedBaseInformation {
    index: number;
    value: string;
    kind: OptionKind.POSITIONAL;
}

export interface ParsedVariadicArgument extends ParsedBaseInformation {
    index: number;
    value: string[];
    kind: OptionKind.VARIADIC;
}

export type ParsedOption = ParsedFlag | ParsedValueOption;

export type ParsedArgument = ParsedArg | ParsedVariadicArgument;

export interface ParserStep {
    handle(context: ParserContext): Maybe<ParserStep>;
}
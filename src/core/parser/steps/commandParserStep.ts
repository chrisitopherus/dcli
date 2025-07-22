import { ParserStep } from "../../../types/core/parser";
import { Maybe } from "../../../types/utility";
import { ParserContext } from "../parserContext";

export class CommandParserStep implements ParserStep {
    public constructor() { }

    handle(context: ParserContext): Maybe<ParserStep> {
        const token = context.currentToken;
        if (!token) return;
        
    }

}
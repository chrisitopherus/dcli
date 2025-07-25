import { ParserStep, ParserStepResult } from "../../../types/core/parser";
import { ParserContext } from "../parserContext";

export class FlagParserStep implements ParserStep {
    public handle(context: ParserContext): ParserStepResult {
        throw new Error("Method not implemented.");
    }

}
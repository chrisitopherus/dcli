import { OptionKind } from "../../utility/options/kind";
import { FlagParserStep } from "./steps/flagParserStep";
import { OptionParserStep } from "./steps/optionParserStep";
import { PositionalParserStep } from "./steps/positionalParserStep";
import { VariadicParserStep } from "./steps/variadicParserStep";

export class OptionParserStepFactory {
    public constructor() { }

    public create(kind: OptionKind) {
        switch (kind) {
            case OptionKind.OPTION:
                return new OptionParserStep();
            case OptionKind.FLAG:
                return new FlagParserStep();
            case OptionKind.POSITIONAL:
                return new PositionalParserStep();
            case OptionKind.VARIADIC:
                return new VariadicParserStep();
        }
    }
}
import { OptionInformation } from "../../types/decorators/options";
import { TypedPropertyDecorator } from "../../types/utility";

export function Option<T>(info: OptionInformation<T>): TypedPropertyDecorator<T> {
    return function (target, propertyKey) { };
}
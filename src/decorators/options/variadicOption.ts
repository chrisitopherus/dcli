import { CLIError } from "../../core/cliError";
import { OptionMetadata, VariadicInformation } from "../../types/decorators/options";
import { TypedPropertyDecorator } from "../../types/utility";
import { merge } from "../../utility/functions/merge";
import { Metadata, MetadataKey } from "../../utility/metadata";
import { OptionKind } from "../../utility/options/kind";

export function Variadic<T>(information: VariadicInformation<T>): TypedPropertyDecorator<T[]> {
    return function (target, propertyKey) {
        if (information.name === undefined || information.name === "") throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "name");
        if (information.description === undefined || information.description === "") throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "description");
        if (information.type === undefined) throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "type");

        const data: OptionMetadata = { ...information, kind: OptionKind.VARIADIC }
        Metadata.defineOrUpdateMetadata(
            MetadataKey.Option,
            target,
            data,
            (metadata) => merge(metadata, data),
            propertyKey
        );
    };
}
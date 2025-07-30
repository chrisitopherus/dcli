import { CLIError } from "../../core/cliError";
import { PositionalInformation, OptionMetadata } from "../../types/decorators/options";
import { TypedPropertyDecorator } from "../../types/utility";
import { patch } from "../../utility/functions/patch";
import { Metadata, MetadataKey } from "../../utility/metadata";
import { OptionKind } from "../../utility/options/kind";

export function Positional<T>(information: PositionalInformation<T>): TypedPropertyDecorator<T> {
    return function (target, propertyKey) {
        if (information.name === undefined || information.name === "") throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "name");
        if (information.description === undefined || information.description === "") throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "description");
        if (information.position === undefined) throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "position");
        if (information.type === undefined) throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "type");

        const data: OptionMetadata = { ...information, kind: OptionKind.POSITIONAL }
        Metadata.defineOrUpdateMetadata(
            MetadataKey.Option,
            target,
            data,
            (metadata) => patch(metadata, data),
            propertyKey
        );
    };
}
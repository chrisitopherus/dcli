import { CLIError } from "../../core/cliError";
import { OptionInformation, OptionMetadata } from "../../types/decorators/options";
import { TypedPropertyDecorator } from "../../types/utility";
import { patch } from "../../utility/functions/patch";
import { Metadata, MetadataKey } from "../../utility/metadata";
import { OptionKind } from "../../utility/options/kind";

export function Option<T>(information: OptionInformation<T>): TypedPropertyDecorator<T> {
    return function (target, propertyKey) {
        if (information.name === undefined || information.name === "") throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "name");
        if (information.description === undefined || information.description === "") throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "description");
        if (information.type === undefined) throw CLIError.factory.missingRequiredInformation(`${target.constructor.name}.${String(propertyKey)}`, "type");

        const data: OptionMetadata = { ...information, kind: OptionKind.OPTION }
        Metadata.defineOrUpdateMetadata(
            MetadataKey.Option,
            target,
            data,
            (metadata) => patch(metadata, data),
            propertyKey
        );
    };
}
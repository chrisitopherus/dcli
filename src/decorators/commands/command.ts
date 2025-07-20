import { CLIError } from '../../core/cliError';
import { CommandClass } from '../../types/core/command';
import { CommandInformation } from '../../types/decorators/command';
import { merge } from '../../utility/functions/merge';
import { Metadata, MetadataKey } from '../../utility/metadata';
export function Command(information: CommandInformation) {
    return function (constructor: CommandClass) {
        if (information.name === undefined || information.name === "") throw CLIError.factory.missingRequiredInformation(constructor.name, "name");
        if (information.description === undefined || information.description === "") throw CLIError.factory.missingRequiredInformation(constructor.name, "description");

        Metadata.defineOrUpdateMetadata(
            MetadataKey.Command,
            constructor,
            { ...information },
            (existing) => merge(existing, information)
        );
    }
}
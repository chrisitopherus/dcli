import { CLIError } from '../../core/cliError';
import { CommandClass } from '../../types/core/command';
import { CommandInformation, CommandMetadata } from '../../types/decorators/command';
import { Metadata, MetadataKey } from '../../utility/metadata';
export function Command(information: CommandInformation) {
    return function (constructor: CommandClass) {
        if (information.name === undefined || information.name === "") throw CLIError.factory.missingCommandName(constructor.name);
        if (information.description === undefined || information.description === "") throw CLIError.factory.missingCommandDescription(constructor.name);

        Metadata.combineOrInitMetadata(
            MetadataKey.Command,
            information satisfies CommandMetadata,
            constructor);
    }
}
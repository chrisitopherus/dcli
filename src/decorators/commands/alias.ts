import { CLIError } from "../../core/cliError";
import { CommandClass } from "../../types/core/command";
import { Metadata, MetadataKey } from "../../utility/metadata";

export function Alias(aliases: string | string[]) {
    return function (constructor: CommandClass) {
        const value = typeof aliases === "string" ? [aliases] : aliases;
        value.forEach(alias => {
            const cleaned = alias?.trim();
            if (!cleaned) throw CLIError.factory.invalidCommandAlias("<empty>", constructor.name);
        });

        Metadata.defineOrUpdateMetadata(
            MetadataKey.Command,
            constructor,
            { aliases: value },
            (metadata) => {
                metadata.aliases = metadata.aliases !== undefined
                    ? [...metadata.aliases, ...value]
                    : value;

                return metadata;
            }
        );
    }
}
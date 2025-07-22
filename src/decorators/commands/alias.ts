import { CLIError } from "../../core/cliError";
import { CommandClass } from "../../types/core/command";
import { patch } from "../../utility/functions/patch";
import { Metadata, MetadataKey } from "../../utility/metadata";

export function Alias(aliases: string | string[]) {
    return function (constructor: CommandClass) {
        if ((!Array.isArray(aliases) || aliases.length === 0) && typeof aliases !== "string") {
            throw CLIError.factory.missingRequiredInformation(constructor.name, "alias");
        }

        const value = typeof aliases === "string" ? [aliases] : aliases;
        value.forEach(alias => {
            const cleaned = alias?.trim();
            if (!cleaned) throw CLIError.factory.invalidAlias(constructor.name, alias);
        });

        Metadata.defineOrUpdateMetadata(
            MetadataKey.Command,
            constructor,
            { aliases: value },
            (metadata) => patch(metadata, { aliases: value })
        );
    }
}
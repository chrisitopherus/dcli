import { CommandClass } from "../../types/core/command";
import { merge } from "../../utility/functions/merge";
import { Metadata, MetadataKey } from "../../utility/metadata";

export function Hidden() {
    return function (constructor: CommandClass) {
        Metadata.defineOrUpdateMetadata(
            MetadataKey.Command,
            constructor,
            { hidden: true },
            (metadata) => merge(metadata, { hidden: true })
        );
    }
}
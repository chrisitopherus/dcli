import { CommandClass } from "../../types/core/command";
import { merge } from "../../utility/functions/merge";
import { Metadata, MetadataKey } from "../../utility/metadata";

export function Default() {
    return function (constructor: CommandClass) {
        Metadata.defineOrUpdateMetadata(
            MetadataKey.Command,
            constructor,
            { default: true },
            (metadata) => merge(metadata, { default: true })
        );
    }
}
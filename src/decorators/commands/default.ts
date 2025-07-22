import { CommandClass } from "../../types/core/command";
import { patch } from "../../utility/functions/patch";
import { Metadata, MetadataKey } from "../../utility/metadata";

export function Default() {
    return function (constructor: CommandClass) {
        Metadata.defineOrUpdateMetadata(
            MetadataKey.Command,
            constructor,
            { default: true },
            (metadata) => patch(metadata, { default: true })
        );
    }
}
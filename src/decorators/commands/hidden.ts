import { CommandClass } from "../../types/core/command";
import { patch } from "../../utility/functions/patch";
import { Metadata, MetadataKey } from "../../utility/metadata";

export function Hidden() {
    return function (constructor: CommandClass) {
        Metadata.defineOrUpdateMetadata(
            MetadataKey.Command,
            constructor,
            { hidden: true },
            (metadata) => patch(metadata, { hidden: true })
        );
    }
}
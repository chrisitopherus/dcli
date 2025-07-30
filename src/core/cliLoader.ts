import "reflect-metadata";
import { CommandClass } from "../types/core/command";
import { Metadata, MetadataKey } from "../utility/metadata";
import { CLIError } from './cliError';
import { CLICommand } from "./commands/command";
import { PropertyKey } from "../types/utility";
import { LoadedCommand, LoadedCommandOptions, LoadedOption, LoadedPositionalOption } from "../types/core/loader";
import { ensure } from "../utility/functions/ensure";
import { OptionKind } from "../utility/options/kind";

export class CLILoader {
    private constructor() { }

    public static load(commands: CommandClass[]): LoadedCommand[] {
        return commands.map((command) => {
            const metadata = this.getCommandMetadata(command);
            if (metadata === undefined) throw CLIError.factory.invalidCommand(command.name);

            // load possible options of command
            const cmdInstance = new command();
            const loadedOptions = this.loadOptions(cmdInstance);
            const subcommands = metadata.subcommands ? this.load(metadata.subcommands) : [];

            return {
                name: ensure(metadata.name, () => CLIError.factory.missingRequiredInformation(command.name, "name", "loader")),
                description: ensure(metadata.description, () => CLIError.factory.missingRequiredInformation(command.name, "description", "loader")),
                commandInstance: cmdInstance,
                subcommands,
                default: metadata.default ?? false,
                hidden: metadata.hidden ?? false,
                aliases: metadata.aliases ?? [],
                options: loadedOptions
            }
        });
    }

    private static loadOptions(command: CLICommand): LoadedCommandOptions {
        const props = Object.getOwnPropertyNames(command);
        const loadedOptions: LoadedCommandOptions = {
            named: [],
            positional: []
        };

        props.forEach((property) => {
            const metadata = this.getOptionMetadata(command, property);
            if (!metadata) return;
            const loadedOption: LoadedOption | LoadedPositionalOption = {
                name: ensure(metadata.name, () => CLIError.factory.missingRequiredInformation(`${command.constructor.name}.${property}`, "name", "loader")),
                description: ensure(metadata.description, () => CLIError.factory.missingRequiredInformation(`${command.constructor.name}.${property}`, "description", "loader")),
                type: ensure(metadata.type, () => CLIError.factory.missingRequiredInformation(`${command.constructor.name}.${property}`, "type", "loader")),
                required: metadata.required ?? false,
                aliases: metadata.aliases ?? [],
                propertyKey: property,
                kind: metadata.kind,
                allowedValues: metadata.allowedValues ?? [],
                position: metadata.position
            };

            const optionStorage = (loadedOption.kind === OptionKind.VARIADIC || loadedOption.kind === OptionKind.POSITIONAL) ? loadedOptions.positional : loadedOptions.named;
            optionStorage.push(loadedOption);
        });

        loadedOptions.positional = this.normalizePositionalOptions(loadedOptions.positional);

        return loadedOptions;
    }

    private static getCommandMetadata(command: CommandClass) {
        return Metadata.getMetadata(MetadataKey.Command, command);
    }

    private static getOptionMetadata(command: CLICommand, propertyKey: PropertyKey) {
        return Metadata.getMetadata(MetadataKey.Option, command, propertyKey);
    }

    private static normalizePositionalOptions(positionals: LoadedPositionalOption[]): LoadedPositionalOption[] {
        const sortedPositionals = positionals.toSorted(this.positionalSort);
        return sortedPositionals.map((option, index) => ({
            ...option,
            position: index
        }));
    }

    private static positionalSort(a: LoadedPositionalOption, b: LoadedPositionalOption): number {
        if (a.kind === OptionKind.VARIADIC) {
            return 1;
        }

        if (b.kind === OptionKind.VARIADIC) {
            return -1;
        }

        return a.position - b.position;
    }
}
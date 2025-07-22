import { CLIError } from "../core/cliError";
import { CLIErrorSource } from "../types/core/error";
import { ErrorCode } from "./errorCode";

export class CLIErrorFactory {
    private constructor() { }

    // decorator

    public static missingRequiredInformation(target: string, field: string, source?: CLIErrorSource): CLIError {
        return new CLIError(
            `Decorator on '${target}' missing required property '${field}'`,
            ErrorCode.DECORATOR_MISSING_REQUIRED_INFORMATION,
            source ?? "decorator"
        );
    }

    public static invalidAlias(target: string, alias: string, source?: CLIErrorSource): CLIError {
        return new CLIError(
            `Decorator on '${target}' received an invalid alias: '${alias}'`,
            ErrorCode.DECORATOR_INVALID_ALIAS,
            source ?? "decorator"
        );
    }

    // loader

    public static invalidCommand(command: string, source?: CLIErrorSource): CLIError {
        return new CLIError(
            `Invalid command encountered: '${command}'`,
            ErrorCode.LOADER_INVALID_CMD,
            source ?? "loader");
    }
}
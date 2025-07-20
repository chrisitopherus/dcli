import { CLIError } from "../core/cliError";
import { ErrorCode } from "./errorCode";

export class CLIErrorFactory {
    private constructor() { }

    // decorator

    public static missingRequiredInformation(target: string, field: string): CLIError {
        return new CLIError(
            `Decorator on '${target}' missing required property '${field}'`,
            ErrorCode.DECORATOR_MISSING_REQUIRED_INFORMATION,
            "decorator"
        );
    }

    public static invalidAlias(target: string, alias: string): CLIError {
        return new CLIError(
            `Decorator on '${target}' received an invalid alias: '${alias}'`,
            ErrorCode.DECORATOR_INVALID_ALIAS,
            "decorator"
        );
    }

    // loader

    public static invalidCommand(command: string): CLIError {
        return new CLIError(`Invalid command encountered: '${command}'`, ErrorCode.LOADER_INVALID_CMD, "loader");
    }
}
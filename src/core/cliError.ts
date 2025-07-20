import { CLIErrorSource } from "../types/core/error";
import { CLIErrorFactory } from "../utility/cliErrorFactory";
import { ErrorCode } from "../utility/errorCode";

export class CLIError extends Error {
    public static readonly factory = CLIErrorFactory;
    public readonly code: ErrorCode;
    public readonly rawMessage: string;
    public readonly source: CLIErrorSource;

    public constructor(message: string, code: ErrorCode, source: CLIErrorSource) {
        super(`[${code} in ${source}] ${message}`);

        this.code = code;
        this.name = "CLIError";
        this.rawMessage = message;
        this.source = source;

        Object.setPrototypeOf(this, CLIError.prototype);
    }

    public override toString(): string {
        return this.message;
    }
}
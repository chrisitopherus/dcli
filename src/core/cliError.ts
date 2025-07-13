import { CLIErrorFactory } from "../utility/cliErrorFactory";
import { ErrorCode } from "../utility/errorCode";

export class CLIError extends Error {
    public static readonly factory = CLIErrorFactory;
    public readonly code: ErrorCode;
    public readonly rawMessage: string;
    public constructor(message: string, code: ErrorCode) {
        super(`[${code}] ${message}`);

        this.code = code;
        this.name = "CLIError";
        this.rawMessage = message;

        Object.setPrototypeOf(this, CLIError.prototype);
    }

    public override toString(): string {
        return `[${this.code}] ${this.rawMessage}`;
    }
}
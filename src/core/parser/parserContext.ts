import { ParserProgress } from "../../types/core/parser";
import { Maybe } from "../../types/utility";

export class ParserContext {
    private index = 0;
    private args: string[];

    public progress: ParserProgress = {
        positionalIndex: 0
    };

    public constructor(args: string[]) {
        this.args = args;
    }

    public get currentIndex(): number {
        return this.index;
    }

    public next() {
        return ++this.index;
    }

    public back() {
        return --this.index;
    }

    public move(index: number) {
        this.index = index;
    }

    public forward(amount: number) {
        this.index += amount;
    }

    public peek(): Maybe<string> {
        return this.args[this.index];
    }

    public consume(): Maybe<string> {
        return this.args[this.index++];
    }

    public hasMore(): boolean {
        return this.index < this.args.length;
    }

    public getAllRemainingToken() {
        return this.args.slice(this.index);
    }
}
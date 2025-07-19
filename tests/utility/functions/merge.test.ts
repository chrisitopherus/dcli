import { merge } from "../../../src/utility/functions/merge";

describe("merge()", () => {
    it("should merge two flat objects with unique keys", () => {
        const a = { name: "Alice" };
        const b = { age: 30 };
        const result = merge(a, b);

        expect(result).toEqual({ name: "Alice", age: 30 });
    });

    it("should override existing keys from incoming", () => {
        const a = { name: "Alice", age: 25 };
        const b = { age: 30 };
        const result = merge(a, b);

        expect(result).toEqual({ name: "Alice", age: 30 });
    });

    it("should merge arrays by concatenation", () => {
        const a = { tags: ["a", "b"] };
        const b = { tags: ["c"] };
        const result = merge(a, b);

        expect(result).toEqual({ tags: ["a", "b", "c"] });
    });

    it("should merge deeply nested objects", () => {
        const a = {
            config: {
                retry: 3,
                timeout: 1000,
                nested: {
                    debug: false
                }
            }
        };

        const b = {
            config: {
                timeout: 2000,
                nested: {
                    verbose: true
                }
            }
        };

        const result = merge(a, b);

        expect(result).toEqual({
            config: {
                retry: 3,
                timeout: 2000,
                nested: {
                    debug: false,
                    verbose: true
                }
            }
        });
    });

    it("should prefer incoming value if not undefined", () => {
        const a = { a: "keep", b: "keep" };
        const b = { b: undefined, c: "add" };
        const result = merge(a, b);

        expect(result).toEqual({ a: "keep", b: "keep", c: "add" });
    });

    it("should include all keys even when only in incoming", () => {
        const a = {};
        const b = { newKey: "value" };
        const result = merge(a, b);

        expect(result).toEqual({ newKey: "value" });
    });

    it("should merge objects even if existing is undefined", () => {
        const a = {};
        const b = {
            options: {
                enabled: true
            }
        };

        const result = merge(a, b);

        expect(result).toEqual({ options: { enabled: true } });
    });

    it("should deeply merge nested arrays and objects", () => {
        const a = {
            items: [{ id: 1 }],
            settings: {
                features: ["a", "b"]
            }
        };

        const b = {
            items: [{ id: 2 }],
            settings: {
                features: ["c"]
            }
        };

        const result = merge(a, b);

        expect(result).toEqual({
            items: [{ id: 1 }, { id: 2 }],
            settings: {
                features: ["a", "b", "c"]
            }
        });
    });

    it("should keep falsy values like false or 0", () => {
        const a = { enabled: true, count: 1 };
        const b = { enabled: false, count: 0 };

        const result = merge(a, b);

        expect(result).toEqual({ enabled: false, count: 0 });
    });

    it("should ignore null properties", () => {
        const a = { config: { a: 1 } };
        const b = { config: null };

        const result = merge(a, b);

        expect(result).toEqual({ config: { a: 1 } });
    });
});
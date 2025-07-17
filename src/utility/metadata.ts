import "reflect-metadata";
import { PropertyName } from "utility-pickle";

export enum MetadataKey {
    Command,
    Arg
}

export class Metadata {
    public static defineOrUpdateMetadata<T>(
        key: MetadataKey,
        target: Object,
        defaultValue: T,
        updateHandler: (metadata: T) => T,
        propertyKey?: PropertyName
    ): T {
        let metadata = this.getMetadata<T>(key, target, propertyKey);
        metadata = metadata === undefined ? defaultValue : updateHandler(metadata);
        return this.defineMetadata(key, metadata, target, propertyKey);
    }

    public static getOrInitMetadata<T extends Record<string, any>>(key: MetadataKey, value: T, target: Object, propertyKey?: PropertyName): T {
        let metadata = this.getMetadata<T>(key, target, propertyKey);

        if (metadata !== undefined) return metadata;

        this.defineMetadata(key, value, target, propertyKey);
        return value;
    }

    public static combineOrInitMetadata<T extends Record<string, any>>(key: MetadataKey, value: T, target: Object, propertyKey?: PropertyName) {
        let metadata: T | undefined = propertyKey ? Reflect.getMetadata(key, target, propertyKey) : Reflect.getMetadata(key, target);
        const combined = metadata ? Object.assign({}, metadata, value) : { ...value };

        this.defineMetadata(key, combined, target, propertyKey);
    }

    private static getMetadata<T>(key: MetadataKey, target: Object, propertyKey?: PropertyName): T | undefined {
        return propertyKey
            ? Reflect.getMetadata(key, target, propertyKey)
            : Reflect.getMetadata(key, target);
    }

    private static defineMetadata<T>(key: MetadataKey, value: T, target: Object, propertyKey?: PropertyName): T {
        if (propertyKey) return this.definePropertyMetadata(key, value, target, propertyKey);
        return this.defineClassMetadata(key, value, target);
    }

    private static defineClassMetadata<T>(key: MetadataKey, value: T, target: Object): T {
        Reflect.defineMetadata(key, value, target);
        return value;
    }

    private static definePropertyMetadata<T>(key: MetadataKey, value: T, target: Object, propertyKey: PropertyName): T {
        Reflect.defineMetadata(key, value, target, propertyKey);
        return value;
    }
}
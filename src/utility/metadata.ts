import "reflect-metadata";
import { PropertyName } from "utility-pickle";
import { MetadataTypeMap } from "../types/utility";

export enum MetadataKey {
    Command,
    Option
}

export class Metadata {
    public static defineOrUpdateMetadata<K extends keyof MetadataTypeMap>(
        key: K,
        target: Object,
        defaultValue: MetadataTypeMap[K],
        updateHandler: (metadata: MetadataTypeMap[K]) => MetadataTypeMap[K],
        propertyKey?: PropertyName
    ): MetadataTypeMap[K] {
        let metadata = this.getMetadata(key, target, propertyKey);
        metadata = metadata === undefined ? defaultValue : updateHandler(metadata);
        return this.defineMetadata(key, metadata, target, propertyKey);
    }

    public static getOrInitMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: Object, propertyKey?: PropertyName): MetadataTypeMap[K] {
        let metadata = this.getMetadata(key, target, propertyKey);

        if (metadata !== undefined) return metadata;

        this.defineMetadata(key, value, target, propertyKey);
        return value;
    }

    public static combineOrInitMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: Object, propertyKey?: PropertyName) {
        let metadata: MetadataTypeMap[K] | undefined = propertyKey ? Reflect.getMetadata(key, target, propertyKey) : Reflect.getMetadata(key, target);
        const combined = metadata ? Object.assign({}, metadata, value) : { ...value };

        this.defineMetadata(key, combined, target, propertyKey);
    }

    private static getMetadata<K extends keyof MetadataTypeMap>(key: K, target: Object, propertyKey?: PropertyName): MetadataTypeMap[K] | undefined {
        return propertyKey
            ? Reflect.getMetadata(key, target, propertyKey)
            : Reflect.getMetadata(key, target);
    }

    private static defineMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: Object, propertyKey?: PropertyName): MetadataTypeMap[K] {
        if (propertyKey) return this.definePropertyMetadata(key, value, target, propertyKey);
        return this.defineClassMetadata(key, value, target);
    }

    private static defineClassMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: Object): MetadataTypeMap[K] {
        Reflect.defineMetadata(key, value, target);
        return value;
    }

    private static definePropertyMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: Object, propertyKey: PropertyName): MetadataTypeMap[K] {
        Reflect.defineMetadata(key, value, target, propertyKey);
        return value;
    }
}
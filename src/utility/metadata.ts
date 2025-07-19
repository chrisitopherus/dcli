import "reflect-metadata";
import { PropertyName } from "utility-pickle";
import { MetadataTypeMap } from "../types/utility";

/**
 * Enum defining keys for metadata storage.
 * 
 * Used to distinguish between different types of metadata.
 */
export enum MetadataKey {
    Command,
    Option
}

/**
 * A helper class to define, update, and retrieve strongly typed metadata.
 */
export class Metadata {

    private constructor() { }

    /**
     * Defines or updates metadata for the given target.
     * 
     * If metadata does not exist yet, it uses `defaultValue`.
     * Otherwise, it applies `updateHandler` to the existing metadata.
     * 
     * @param key - The metadata key.
     * @param target - the target object or class.
     * @param defaultValue - The default value if no metadata is defined yet.
     * @param updateHandler - A function to merge/update existing metadata.
     * @param propertyKey - The optional property key for property-level metadata.
     * @returns The resulting metadata.
     */
    public static defineOrUpdateMetadata<K extends keyof MetadataTypeMap>(
        key: K,
        target: object,
        defaultValue: MetadataTypeMap[K],
        updateHandler: (metadata: MetadataTypeMap[K]) => MetadataTypeMap[K],
        propertyKey?: PropertyName
    ): MetadataTypeMap[K] {
        let metadata = this.getMetadata(key, target, propertyKey);
        metadata = metadata === undefined ? defaultValue : updateHandler(metadata);
        return this.defineMetadata(key, metadata, target, propertyKey);
    }

    /**
     * Retrieves metadata if it exists, or sets it to a default value.
     * 
     * @param key - The metadata key.
     * @param target - The target object or class.
     * @param defaultValue - The default value if no metadata is defined yet.
     * @param propertyKey - The optional property key for property-level metadata.
     * @returns The existing or newly set metadata.
     */
    public static getOrDefineMetadata<K extends keyof MetadataTypeMap>(key: K, target: object, defaultValue: MetadataTypeMap[K], propertyKey?: PropertyName): MetadataTypeMap[K] {
        let metadata = this.getMetadata(key, target, propertyKey);

        if (metadata !== undefined) return metadata;

        this.defineMetadata(key, defaultValue, target, propertyKey);
        return defaultValue;
    }

    /**
     * Merges an existing metadata value with a new one using shallow assignment.
     * 
     * If no metadata is found, sets it to the provided value directly.
     * 
     * @param key - The metadata key.
     * @param target - The target object or class.
     * @param value - The new metadata to merge.
     * @param propertyKey - The optional property key for property-level metadata.
     * @returns The combined or newly set metadata.
     */
    public static combineOrDefineMetadata<K extends keyof MetadataTypeMap>(key: K, target: object, value: MetadataTypeMap[K], propertyKey?: PropertyName): MetadataTypeMap[K] {
        let metadata: MetadataTypeMap[K] | undefined = propertyKey ? Reflect.getMetadata(key, target, propertyKey) : Reflect.getMetadata(key, target);
        const combined = metadata ? Object.assign({}, metadata, value) : { ...value };

        return this.defineMetadata(key, combined, target, propertyKey);
    }

    /**
     * Retrieves metadata from a target object.
     * 
     * @param key - The metadata key.
     * @param target - The target class or object.
     * @param propertyKey - The optional property key for property-level metadata.
     * @returns The metadata value or undefined.
     */
    public static getMetadata<K extends keyof MetadataTypeMap>(key: K, target: object, propertyKey?: PropertyName): MetadataTypeMap[K] | undefined {
        return propertyKey
            ? Reflect.getMetadata(key, target, propertyKey)
            : Reflect.getMetadata(key, target);
    }

    /**
     * Defines metadata on a class or property.
     * @param key - The metadata key.
     * @param value - The metadata to set.
     * @param target - The target class or object.
     * @param propertyKey - The optional property key for property-level metadata. 
     * @returns The metadata that was set.
     */
    public static defineMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: object, propertyKey?: PropertyName): MetadataTypeMap[K] {
        if (propertyKey) return this.definePropertyMetadata(key, value, target, propertyKey);
        return this.defineClassMetadata(key, value, target);
    }

    /**
     * Defines metadata at the class level.
     * @param key - The metadata key.
     * @param value - The metadata to set.
     * @param target - The target class or object.
     * @returns The class metadata that was set.
     */
    private static defineClassMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: object): MetadataTypeMap[K] {
        Reflect.defineMetadata(key, value, target);
        return value;
    }

    /**
     * Defines metadata at the property level.
     * @param key - The metadata key.
     * @param value - The metadata to set.
     * @param target - The target class or object.
     * @param propertyKey - The optional property key for property-level metadata.
     * @returns The property metadata that was set.
     */
    private static definePropertyMetadata<K extends keyof MetadataTypeMap>(key: K, value: MetadataTypeMap[K], target: object, propertyKey: PropertyName): MetadataTypeMap[K] {
        Reflect.defineMetadata(key, value, target, propertyKey);
        return value;
    }
}